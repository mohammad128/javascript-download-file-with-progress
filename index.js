export default class Downloader  {
    onChangeStateCallback = null;
    onFinishCallback = null;
    blobUrl = null;
    state = '';

    constructor(url) {
        this.url = url;
        this.request = new XMLHttpRequest();
        this.#changeState();
    }

    start() {
        this.request.responseType = 'blob';
        this.request.open('get', this.url, true);
        this.request.send();

        return this;
    }

    onFinish( callBack ) {
        this.onFinishCallback = callBack;
        return this;
    }

    save(fileName) {
        function downloadURI(uri, name) {
            var link = document.createElement("a");
            link.download = name;
            link.href = uri;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            link.remove();
        }
        if(this.blobUrl)
            downloadURI(this.blobUrl, fileName);

        return this;
    }

    getState() {
        switch ( this.request.readyState ) {
            case 0:
                return 'UNSENT';
            case 1:
                return 'OPENED';
            case 2:
                return 'HEADERS_RECEIVED';
            case 3:
                return 'LOADING';
            case 4:
                return 'DONE';
        }
    }

    #changeState() {
        let that = this;
        this.state = this.getState();
        this.request.onreadystatechange = function() {
            that.state = that.getState();
            if( that.onChangeStateCallback )
                that.onChangeStateCallback(that.state);
            if(this.readyState === 4 && this.status === 200) {
                that.blobUrl = window.URL.createObjectURL(this.response);
                if(that.onFinishCallback != null) {
                    that.onFinishCallback(that.blobUrl);
                }
            }
        };
    }

    onChangeState(callback) {
        this.onChangeStateCallback = callback;
        return this;
    }

    abort() {
        this.state = 'ABORT';
        if (this.onChangeStateCallback)
            this.onChangeStateCallback( this.state )
        this.request.abort();
    }


    onProgress( callback ) {
        this.request.onprogress = (e) => {
            let loaded = e.loaded, total = e.total;
            var percent_complete = (loaded / total) * 100;
            percent_complete = Math.floor(percent_complete);

            callback(percent_complete, loaded, total);
        };
        return this;
    }

}


