'use strict';
const CosSdk = require('cos-nodejs-sdk-v5');
const shortid = require('shortid');
const multiparty = require('multiparty');
const readChunk = require('read-chunk');
const fs = require('fs');
const fileType = require('file-type');
const regionMap = {
    'ap-beijing-1': 'tj',
    'ap-beijing': 'bj',
    'ap-shanghai': 'sh',
    'ap-guangzhou': 'gz',
    'ap-chengdu': 'cd',
    'ap-singapore': 'sgp',
    'ap-hongkong': 'hk',
    'na-toronto': 'ca',
    'eu-frankfurt': 'ger'
};
module.exports = app => {
    class cosService extends app.Service {
        constructor(ctx) {
            super(ctx);
            const config = app.config.weapp;
            const cos = new CosSdk({
                SecretId: config.cos.qcloudSecretId,
                SecretKey: config.cos.qcloudSecretKey,
                Domain: `http://${config.cos.fileBucket}-${config.cos.qcloudAppId}.cos.${config.cos.region}.myqcloud.com/`
            });

            this.cosobject = {
                cos,
                isready: false
            };

        }

        checkCos() {
            const cos = this.cosobject.cos;
            const config = this.app.config.weapp;
            const buckets = `${config.cos.fileBucket}-${config.cos.qcloudAppId}`;
            const params = {
                Bucket: buckets,
                Region: config.cos.region,
            };
            return new Promise((resolve, reject) => {
                cos.getService(params, (err, data) => {
                    if (err) {
                        reject(err);
                    }

                    // 检查提供的 Bucket 是否存在
                    const hasBucket = data.Buckets && data.Buckets.some(item => {
                        return item.Name === buckets;
                    });

                    if (data.Buckets && !hasBucket) {
                        cos.putBucket({
                            Bucket: config.cos.fileBucket,
                            Region: config.cos.region,
                            ACL: 'public-read'
                        }, function (err) {
                            if (err) {
                                resolve(err);
                            } else {
                                resolve(cos);
                            }
                        });
                    } else {
                        resolve(cos);
                    }
                });
            });
        }


        uploader() {
            const req = this.ctx.request.req;
            const config = app.config.weapp;
            const maxSize = config.cos.maxSize ? config.cos.maxSize : 10;
            const form = new multiparty.Form({
                encoding: 'utf8',
                maxFilesSize: maxSize * 1024 * 1024,
                autoFiles: true,
                uploadDir: './app/public/temp'
            });
            const fieldName = config.cos.fieldName ? config.cos.fieldName : 'file';
            return new Promise((resolve, reject) => {
                this.checkCos().then(cos => {
                    form.parse(req, (err, fields, files = {}) => {
                        if (err) {
                            reject(err);
                        } else {
                            if (!(fieldName in files)) {
                                throw new Error('没有field:' + fieldName);
                            }
                            const imageFile = files[fieldName][0];
                            const buffer = readChunk.sync(imageFile.path, 0, 262);
                            let resultType = fileType(buffer);

                            // 如果无法获取文件的 MIME TYPE 就取 headers 里面的 content-type
                            if (resultType === null && imageFile.headers && imageFile.headers['content-type']) {
                                const tmpPathArr = imageFile.path ? imageFile.path.split('.') : [];
                                const extName = tmpPathArr.length > 0 ? tmpPathArr[tmpPathArr.length - 1] : '';
                                resultType = {
                                    mime: imageFile.headers['content-type'],
                                    ext: extName
                                };
                            }

                            const allowMimeTypes = config.cos.mimetypes
                                ? config.cos.mimetypes
                                : [ 'image/jpeg', 'image/jp2', 'image/jpm', 'image/jpx', 'image/gif', 'image/bmp', 'image/png', 'audio/mpeg', 'audio/mp3', 'audio/m4a', 'application/pdf' ];
                            if (!resultType || !allowMimeTypes.includes(resultType.mime)) {
                                throw new Error('不支持文件类型' + imageFile);
                            }

                            // 生成上传传参数
                            const srcpath = imageFile.path;
                            const imgKey = `${Date.now()}-${shortid.generate()}.${resultType.ext}`;
                            const uploadFolder = config.cos.uploadFolder ? config.cos.uploadFolder + '/' : '';
                            const buckets = `${config.cos.fileBucket}-${config.cos.qcloudAppId}`;

                            const upparams = {
                                Bucket: buckets,
                                Region: config.cos.region,
                                Key: `${uploadFolder}${imgKey}`,
                                Body: fs.createReadStream(srcpath),
                                ContentLength: imageFile.size
                            };
                            cos.putObject(upparams, (err) => {
                                if (err) {
                                    reject(err);
                                    // remove uploaded file
                                    fs.unlink(srcpath, err => {
                                        if (err) {
                                            console.log(err);
                                        }
                                    });
                                }

                                resolve({
                                    imgUrl: `https://${buckets}.cos.${config.cos.region}.myqcloud.com/${uploadFolder}${imgKey}`,
                                    imgUrlv4: `http://${buckets}.cos${regionMap[config.cos.region]}.myqcloud.com/${uploadFolder}${imgKey}`,
                                    size: imageFile.size,
                                    mimeType: resultType.mime,
                                    name: imgKey,
                                    fileBucket: config.cos.fileBucket,
                                    qcloudAppId: config.qcloudAppId,
                                    region: config.cos.region,
                                    uploadFolder,
                                    imgKey
                                });

                                // remove uploaded file
                                fs.unlink(srcpath, err => {
                                    if (err) {
                                        console.log(err);
                                    }
                                });
                            });
                        }
                    });
                }).catch(err => { reject(err); });
            });

        }
    }
    return cosService;
};
