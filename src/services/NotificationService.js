class NotificationService {

    constructor() {
        this.observers = [];
    }

    addObserver(observer) {
        this.observers.push(observer);
    }

    notify(message) {
        for (const observer of this.observers) {
            try {
                console.log("Notificando observer: ", observer.constructor.name);
                observer.update(message);
            } catch (error) {
                console.log("Erro ao propagar observer: ", observer);
            }
        }
    }
}

module.exports = NotificationService;
