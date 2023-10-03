import {saveAs} from 'file-saver';

const convertBase64ToFile = (dataBase64) => {
    const byteString = atob(dataBase64.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i += 1) {
        ia[i] = byteString.charCodeAt(i);
    }
    const newBlob = new Blob([ab], {
        type: 'application/pdf',
    });
    return newBlob;
};


const convertFile = (data, name) => {
    const blob = convertBase64ToFile(data);
    const file = new File([blob], name + ".pdf", {type: 'application/pdf'});
    saveAs(file);
}

export default convertFile;