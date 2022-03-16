# Javascript Download File With Progress


```javascript
    import Downloader from 'downloader-with-progress';
    
    let url = 'http://cachefly.cachefly.net/100mb.test';
    let dl = new Downloader(url);
    dl.onProgress((percent, loaded, total) => {
        console.log('percent: ' + percent, 'loaded: ' + loaded, 'total: ' + total);
    })
    .onChangeState((state) => {
        console.log('state', state);
    })
    .onFinish((blobUrl) => {
        console.log('finshed', blobUrl)
        dl.save('filename.ext'); // Save File
    })
    .start();
    
    // OR 
    
    dl.abort(); 
    
```
