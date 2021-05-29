class Order {
    constructor(id, items, totalAmount, date){
        this.id = id;
        this.items = items;
        this.totalAmount = totalAmount;
        this.date = date;
    }

    get readableDate() {
        return this.date.toLocaleDateString('en-EN',{
            year: 'numeric',
            month: 'long',
            date: 'numeric',
            hour: '2-digit',
            min: '2-digit'
        });
    }

}

export default Order;