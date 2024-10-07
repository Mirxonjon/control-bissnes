"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteFileCloud = exports.googleCloud = void 0;
const uuid_1 = require("uuid");
const storage_1 = require("@google-cloud/storage");
const path_1 = require("path");
const projectId = 'telecom-398714';
const keyFilename = (0, path_1.resolve)(process.cwd(), 'src', 'utils', 'key.json');
const storage = new storage_1.Storage({
    projectId,
    keyFilename,
});
const bucket = storage.bucket('telecom2003');
const googleCloud = (file) => {
    var _a, _b;
    const a = [];
    a.push(file);
    const imageLink = (0, path_1.join)((0, uuid_1.v4)() + (0, path_1.extname)((_a = a[0]) === null || _a === void 0 ? void 0 : _a.originalname));
    const blob = bucket.file(imageLink);
    const blobStream = blob.createWriteStream();
    blobStream.on('error', (err) => { });
    blobStream.end((_b = a[0]) === null || _b === void 0 ? void 0 : _b.buffer);
    return imageLink;
};
exports.googleCloud = googleCloud;
const deleteFileCloud = async (imageLink) => {
    new Promise((resolve, reject) => {
        const blob = bucket
            .file(imageLink)
            .delete()
            .then((image) => {
            resolve(imageLink);
        })
            .catch((e) => {
            reject(e);
        });
    });
    return imageLink;
};
exports.deleteFileCloud = deleteFileCloud;
//# sourceMappingURL=google_cloud.js.map