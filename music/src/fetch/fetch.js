export default function FetchData(url,type,data){
    let proxy = 'https://bird.ioliu.cn/v1/?url=';

    if(type.toLowerCase() === 'get'){
        return fetch(proxy + url);
    }else{
        let datas = "";
        for(let i in data){
            if(data.hasOwnProperty(i)){
                datas += i + '=' + data[i] + "&"
            }
        }
        datas.substring(0,-1);
        let requesturl = proxy + url;
        return fetch(requesturl,{
            method: type,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: datas
        })
    }
}