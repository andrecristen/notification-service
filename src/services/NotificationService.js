class NotificationService {

    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notify(message) {
        for (const observer of this.observers) {
            observer.update(message);
        }
    }
}

module.exports = NotificationService;
