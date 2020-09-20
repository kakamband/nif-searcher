const SearchingService = require('./SearchingService');
const ExcelWriter = require('../../lib/ExcelWriter');

const langs = require('../../lib/lang');

const updatePositions = () => {
    const reduced = module.exports.list.filter(item => !item.finished);

    for(item of reduced) {
        const index = reduced.indexOf(item);

        item.position = index+1;
    }
}

module.exports = {
    list: [],
    isWorking: false,
    async work() {
        
        if(!this.isWorking) {
            this.isWorking = true;

            while(this.isWorking) {
                const reduced = this.list.filter(item => !item.finished);

                if(reduced[0]) {
                    const array = [];

                    for(item of reduced[0].array) {
                        const found = await SearchingService.handle(item);
                        
                        reduced[0].progress = parseInt(( (reduced[0].array.indexOf(item)+1) / reduced[0].array.length ) * 100);
                        
                        array.push(found);
                    }

                    await ExcelWriter.generateWorkbook(array, 'Data', reduced[0].hash);

                    reduced[0].finished = true;

                    updatePositions();

                    reduced[0].path = `./tmp/downloads/${reduced[0].hash}.xlsx`;
                } else {
                    this.isWorking = false;
                }
            }

        }
    },
    add(object) {
        this.list.push(object);

        const index = this.list.indexOf(object);

        if(index >= 0) {
            this.list[index].position = index+1;
        }
    },
    state(hash) {
        const found = this.list.find(item => item.hash == hash);

        return found;
    },
    find(userHash) {
        const found = this.list.filter(item => item.userHash == userHash);

        return found;
    }
}