const render = (hashData) => {
    const position = document.querySelector('div.item.position div.value');
    const status = document.querySelector('div.item.status div.value');
    const total = document.querySelector('div.item.total div.value');
    const bar = document.querySelector('#progressbar div.bar');
    
    position.innerText = hashData.position;

    let text = '';

    if(hashData.position > 1) text = lang.general.waiting_queue;
    else if(hashData.finished) text = lang.general.finished;
    else text = lang.general.started;

    status.innerText = text;

    total.innerText = hashData.total;
    bar.style.width = hashData.progress;
    bar.innerText = hashData.progress;
}

const searchState = async () => {
    const hash = document.querySelector('input[name="hash"]').value;

    const response = await axios.get(`/results/${hash}/state`);

    const data = response.data;
    
    if(data.status == 'error') {

    } else {
        const hashData = {
            position: data.found.position,
            total: data.found.array.length,
            progress: `${data.found.progress || 0}%`,
            finished: !!data.found.finished
        }
        
        render(hashData);

        if(!data.found.finished) {
            setTimeout(searchState, 1000);
        } else {
            const axiosResultsDiv = document.querySelector('div.axios-results');

            axiosResultsDiv.classList.remove('hidden');
        
            const message = axiosResultsDiv.querySelector('div.message a');

            BuildLottie.build('download');

            message.href = `/results/${hash}/download`;
            message.innerText = lang.general.download_ready;
            
            setTimeout(() => {
                location.href += "/download";
            }, 3000);
        }
    }
}

if(!hashFinished) searchState();