const utils = {
    idb: {
        config: {
            dbName: 'frontCloud',
            tbName: 'datas',
            keyPath: 'name',
            db: null,
            version: null
        },
        getVersion() {
            let idb = this;
            return new Promise((resolve, reject) => {
                if (idb.config.db) {
                    resolve(idb.config.db)
                } else {
                    const request = indexedDB.open(idb.config.dbName);
                    request.onupgradeneeded = function() {
                        request.result.createObjectStore(idb.config.tbName, { keyPath: idb.config.keyPath })
                    }
                    request.onsuccess = function() {
                        const db = request.result;
                        idb.config.db = db;
                        idb.config.version = db.version;
                        resolve(db);
                    }
                    request.onerror = function() {
                        reject(request.error.name)
                    }
                }
            })
        },
        getKey(key) {
            var idb = this;
            return new Promise(function(resolve, reject) {
                // 打开数据库
                idb.getVersion().then(function(db) {
                    var store = db.transaction(idb.config.tbName, 'readwrite').objectStore(idb.config.tbName);
                    var request = store.get(key);
                    request.onsuccess = function(e) {
                        var obj = request.result;
                        resolve(obj);
                    };
                    request.onerror = function(e) {
                        reject(request.error.name);
                    };
                });
            });
        },
        /**
         * 获取数据所有数据
         */
        getAll() {
            var idb = this;
            return new Promise(function(resolve, reject) {
                // 打开数据库
                idb.getVersion().then(function(db) {
                    var store = db.transaction(idb.config.tbName, 'readwrite').objectStore(idb.config.tbName);
                    var request = store.openCursor();
                    var list = [];
                    request.onsuccess = function(event) {
                        var cursor = event.target.result;
                        if (cursor) {
                            var value = cursor.value;
                            list.push(value);
                            cursor.continue();
                        } else {
                            resolve(list);
                        }
                    }
                    request.onerror = function(event) {
                        reject(request.error.name)
                    };
                });
            });
        },
        /**
         * 保存一条或多条数据
         * @params dataList obj/list
         */
        saveIndexedDB: function(dataList) {
            var idb = this;
            var list = [].concat(dataList)
            return new Promise(function(resolve, reject) {
                // 打开数据库
                idb.getVersion().then(function(db) {
                    var store = db.transaction(idb.config.tbName, 'readwrite').objectStore(idb.config.tbName);
                    
                    var putReqs = list.map((data) => {
                    	return new Promise((resolve,reject)=>{
                    		var request = store.put(data);
                    		request.onsuccess = function(event) {
	                            resolve(data);
	                        };
	                        request.onerror = function(event) {
	                            resolve(request.error);
	                        };
                    	})
                    })
                    Promise.all(putReqs).then(res=>{
                    	resolve(res)
                    }).catch(e=>{
                    	reject(e)
                    })

                });
            });
        },
        /**
         * 删除一条数据
         */
        deleteKey: function(key) {
            var idb = this;
            return new Promise(function(resolve, reject) {
                // 打开数据库
                idb.getVersion().then(function(db) {
                    var store = db.transaction(idb.config.tbName, 'readwrite').objectStore(idb.config.tbName);
                    var result = store.delete(key);
                    result.onsuccess = function(event) {
                        resolve(key)
                    };
                    result.onerror = function(event) {
                        reject(event)
                    };
                });
            });
        },
    }
}

export default utils;