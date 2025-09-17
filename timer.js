new Vue({
    el: '#app',
    data: {
        minutes: 0,
        seconds: 0,
        totalSeconds: 0,
        initialTotalSeconds: 0,
        timer: null,
        isRunning: false
    },
    computed: {
        displayTime() {
            const mm = String(Math.floor(this.totalSeconds / 60)).padStart(2, '0');
            const ss = String(this.totalSeconds % 60).padStart(2, '0');
            return `${mm}:${ss}`;
        }
        ,
        progress() {
            if (!this.initialTotalSeconds || this.initialTotalSeconds === 0) return 0;
            return (this.totalSeconds / this.initialTotalSeconds) * 100;
        }
    },
    watch: {
        minutes(val) {
            if (!this.isRunning) {
                this.updateTotalSeconds();
            }
        },
        seconds(val) {
            if (!this.isRunning) {
                this.updateTotalSeconds();
            }
        }
    },
    methods: {
        updateTotalSeconds() {
            this.totalSeconds = (parseInt(this.minutes) || 0) * 60 + (parseInt(this.seconds) || 0);
            // Keep a snapshot of the initial total seconds so we can compute progress
            this.initialTotalSeconds = this.totalSeconds;
        },
        startTimer() {
            if (this.totalSeconds > 0 && !this.isRunning) {
                this.isRunning = true;
                this.timer = setInterval(this.countdown, 1000);
            }
        },
        pauseTimer() {
            this.isRunning = false;
            clearInterval(this.timer);
        },
        resetTimer() {
            this.isRunning = false;
            clearInterval(this.timer);
            this.minutes = 0;
            this.seconds = 0;
            this.totalSeconds = 0;
            this.initialTotalSeconds = 0;
        },
        countdown() {
            if (this.totalSeconds > 0) {
                this.totalSeconds--;
            } else {
                this.pauseTimer();
            }
        },

        
        hardBoiled(){
            this.minutes = 4;
            this.seconds = 30;
            this.updateTotalSeconds();
        },
        softBoiled(){
            this.minutes = 3;
            this.seconds = 15;
            this.updateTotalSeconds();

        },
        poached(){
            this.minutes = 2;
            this.seconds = 45;
            this.updateTotalSeconds();
        }
    },
    mounted() {
        this.updateTotalSeconds();
    }
})