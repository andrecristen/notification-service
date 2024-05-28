class NotificationService {

    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    async notify(message) {
        let success = 0;
        for (const observer of this.observers) {
            try {
                if (await observer.update(message)) {
                    success++;
                }
            } catch (error) {
                return false;
            }
        }
        return (success == this.observers.length);
    }
}

module.exports = NotificationService;
