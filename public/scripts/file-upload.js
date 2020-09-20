const FileUpload = {
    handle(event) {
        
        if(this.quantityCheck(event)) {
            this.addFileList(event.target.files[0]);

            this.allowSubmition();
        } else {
            event.preventDefault();
        }

    },
    quantityCheck(event) {
        return event.target.files.length == 1;
    },
    addFileList(file) {
        const filesListDiv = document.querySelector('div.file-list');

        filesListDiv.classList.remove('error');

        filesListDiv.innerText = `${lang.general.file_selected} ${file.name}`;
    },
    allowSubmition() {
        const button = document.querySelector('div.card button.submit');

        button.removeAttribute('disabled');
    },
    async post() {
        input_file.setAttribute('disabled', true);

        const data = new FormData();

        const file = input_file.files[0];

        data.append('file', file);

        const button = document.querySelector('div.card button.submit');

        const axiosResultsDiv = document.querySelector('div.axios-results');
        
        const message = axiosResultsDiv.querySelector('div.message a');

        message.innerText = '';

        const filesListDiv = document.querySelector('div.file-list');

        const progressBar = document.querySelector('#progressbar')
        const progressBarDiv = progressBar.querySelector('div');
        progressBar.classList.remove('hidden');

        progressBarDiv.style.width = "0%";

        try {
            
            button.setAttribute('disabled', true);
            const response = await axios.post('/', data, {
                onUploadProgress: e => {
                    const progress = parseInt(Math.round((e.loaded * 100 / e.total)))

                    progressBarDiv.style.width = `${progress}%`;
                    progressBarDiv.innerText = `${progress}%`;
                }
            });
            button.removeAttribute('disabled');

            if(response.data) {
                axiosResultsDiv.classList.remove('hidden');

                BuildLottie.build(response.data.status);

                if(response.data.status == 'error') {
                    filesListDiv.classList.add('error');
                    
                    filesListDiv.innerText = response.data.message;

                    button.setAttribute('disabled', true);

                    message.innerText = response.data.message;

                    message.href = '/';
                } else if(response.data.status == 'success') {
                    message.innerText = response.data.message;

                    setTimeout(() => {
                        location.href += `results/${response.data.hash}`;
                    }, 3000);
                }
            }

        } catch(e) {
            input_file.removeAttribute('disabled');

            axiosResultsDiv.classList.remove('hidden');

            BuildLottie.build('error');

            button.classList.add('disabled');

            if(e.response) {
                if(e.response.data.toLowerCase().includes('file too large')) {
                    filesListDiv.innerText = lang.errors.file_large;
    
                    filesListDiv.classList.add('error');

                    message.innerText = lang.errors.file_large;

                    message.href = '/';
                } else {
                    message.innerText = lang.errors.unexpected;

                    message.href = '/';
                }
            } else {
                message.innerText = lang.errors.unexpected;

                message.href = '/';
            }
        }
        
        input_file.removeAttribute('disabled');
    }
}