export default function FetchData(url,type,data){
    let proxy = 'https://bird.ioliu.cn/v1/?url=';
    console.log(type);
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
        return fetch(proxy + url,{
            method: type,
            headers: {
                "Accept": 'application/json,text/plain',
                "Content-type": "application/x-www-form-urlencoded;charset=UTF-8",
            },
            body: datas
        })
    }
}