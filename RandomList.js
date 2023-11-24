class RandomList{
    constructor(){
        this.list = []
    }

    add(ele){
        this.list.push(ele);
    }

    // n should always be <= size
    getNRandoms(n){
        const size = this.list.length;
        let selectedElements = [];

        for(let i=0;i<n;i++)
        {
            const selectedIndex = this.randInt(0, size - i);
            selectedElements.push(selectedIndex);
            this.swap(selectedIndex, size - i - 1);
        }
    }

    getSize()
    {
        return this.list.length;
    }

    randInt(min, max) {
        return Math.floor(Math.random() * (max - min)) + min;
    }

    swap(firstIndex, secondIndex)
    {
        const tmp = this.list[firstIndex];
        this.list[firstIndex] = this.list[secondIndex];
        this.list.secondIndex = tmp;
    }
}

module.exports = RandomList;