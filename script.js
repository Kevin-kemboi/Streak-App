document.addEventListener("DOMContentLoaded", function () {
    const activities = [
        { name: "Walk the Dog", icon: "🐕" },
        { name: "Running", icon: "🏃‍♂️" },
        { name: "Healthy Eating", icon: "🥗" },
        { name: "Enough Sleep", icon: "😴" },
        { name: "Taking Walks", icon: "🚶‍♂️" }
    ];

    const activityGrid = document.getElementById('activity-grid');
    activities.forEach(activity => {
        const activityDiv = document.createElement('div');
        activityDiv.className = 'activity';
        activityDiv.innerHTML = `<span>${activity.icon}</span><br>${activity.name}<br><div class="progress-circle"><div class="progress-bar"></div></div>`;
        activityDiv.addEventListener('click', function () {
            const stopTime = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            addHabit(activity.name, stopTime);
        });
        activityGrid.appendChild(activityDiv);
    });

    const habitList = document.getElementById('habit-list');

    function addHabit(habitName, stopTime) {
        const stopDate = new Date();
        const stopTimeFormatted = stopTime.split(':');
        stopDate.setHours(parseInt(stopTimeFormatted[0], 10));
        stopDate.setMinutes(parseInt(stopTimeFormatted[1], 10));
        
        const currentDate = new Date();
        const timeDifference = currentDate.getTime() - stopDate.getTime();
        const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        const habitDiv = document.createElement('div');
        habitDiv.className = 'habit';
        habitDiv.innerHTML = `
            <div class="habit-details">
                <strong>${habitName}</strong><br>
                Stopped at: ${stopTime}<br>
                Days since stopped: ${daysPassed}
            </div>
            <div class="progress-circle">
                <div class="progress-bar"></div>
            </div>
            <button class="delete-btn">Delete</button>`;
        habitList.appendChild(habitDiv);
        updateProgressBars();
        const deleteBtn = habitDiv.querySelector('.delete-btn');
        deleteBtn.addEventListener('click', function () {
            habitDiv.remove();
            updateProgressBars();
        });
    }

    function updateProgressBars() {
        const habits = document.querySelectorAll('.habit');
        habits.forEach(habit => {
            const progressBar = habit.querySelector('.progress-bar');
            progressBar.style.width = `${Math.random() * 100}%`; // Dummy data, replace with actual completion percentage
        });
    }
});
