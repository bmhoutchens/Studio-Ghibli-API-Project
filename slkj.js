function spinWords(string){
    let wordArray = new Array;
    for( i = 0; i < string.length; i++){
        if(string.charAt(i) == " " || i == string.length - 1){
            wordArray.push(string.slice("",i));
            for(place = 0; place < wordArray.length; place++){
                string = string.replace(wordArray[place], "");
            }
        }
    }
    for(index = 0; index < wordArray.length; index++){
        let newArray = new Array;
        if(wordArray[index].length >= 5){
            newArray = wordArray[index];
            for(index = 0; index < newArray.length; index++){
                newArray = newArray.split(index);
            }
            console.log(newArray);
        }
    }
    return wordArray;
}

console.log(spinWords("Hey fellow warriors"))