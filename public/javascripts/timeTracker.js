window.onload = () => {
    let model = {
        timeLogData: []
    };

    let controller = {
        getTimeLogs: () => {
            return model.timeLogData;
        },
        updateTimeLogs: (timeLogs) => {
            model.timeLogData = timeLogs;
            view.render();
        }
    };

    let view = {
        init: () => {
            
            this.submitButtonRef = document.querySelector('#SubmitNewEntry');

            this.submitButtonRef.addEventListener('click', () => {
                fetch('http://localhost:3000/timeTracker/newEntry', {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify({
                        task: document.querySelector('#task').value,
                        starttime: document.querySelector('#starttime').value,
                        endtime: document.querySelector('#endtime').value
                    })
                })
                .then(res => res.json())
                .then(res => {
                    controller.updateTimeLogs(res.payload);
                }).catch(err => {
                    console.log(err);
                    console.log('Error!');
                });
            });
        },  
        render: () => {
            let timeBlockElementRef = document.querySelector('#timeLogList');

            while (timeBlockElementRef.firstChild) {
                timeBlockElementRef.removeChild(timeBlockElementRef.firstChild);
            }
            let htmlToBeAdded = '';
            controller.getTimeLogs().forEach(val => {
                htmlToBeAdded = htmlToBeAdded
                    +
                    `
                <div id="timeBlock" data-id="${val._id}">
                <h2>Task name - ${val.task}</h2>
                <h3>Date - ${val.date}</h3>
                <h3>StartTime - ${val.startTime}</h3>
                <h3>End Time  - ${val.endTime}</h3>
                </div>
                `
            });
            
            let newElement = document.createElement('span');

            newElement.innerHTML = htmlToBeAdded;

            timeBlockElementRef.appendChild(newElement);
            

        }
    };

    view.init();
};