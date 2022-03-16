# Javascript Download File With Progress
#

```javascript

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