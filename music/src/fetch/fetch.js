export default function FetchData(url, type, data) {
    // let req = 'https://api.imjad.cn/cloudmusic/?';
    let req = 'https://api.obfs.dev/api/netease/?';
    if (type.toLowerCase() === 'get') {
        return fetch(req + url);
    } else {
        let datas = '';
        for (let i in data) {
            if (data.hasOwnProperty(i)) {
                datas += i + '=' + data[i] + '&';
            }
        }
        datas.substring(0, -1);
        let requestUrl = req + url;
        return fetch(requestUrl, {
            method: type,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: datas
        });
    }
}
