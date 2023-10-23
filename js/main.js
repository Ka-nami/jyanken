'use strict';
document.addEventListener('DOMContentLoaded',()=>{
    class Card{
        constructor(suit,num){
        this.suit=suit;
        this.num=num;
        this.front=`${suit}${num < 10 ? '0':''}${num}.gif`;
        }
    }

    const cards=[];
    const suits=['s','d','h','c'];

    for(let i=0;i<suits.length;i++){
        for(let j=1;j<=13;j++){
        let card=new Card(suits[i],j);
        cards.push(card);
        }
    }

let firstCard=null;
let secondCard=null;

const flip=(eve)=>{

    let div=eve.target;

    if(!div.classList.contains('back') || secondCard !== null){return;}

    div.classList.remove('back');

    if(firstCard === null){
        firstCard=div;
    }else{
        secondCard=div;
        if(firstCard.num === secondCard.num){
        firstCard.classList.add('fadeout');
        secondCard.classList.add('fadeout');
        [firstCard,secondCard]=[null,null];
        }else{
        setTimeout(()=>{
        firstCard.classList.add('back');
        secondCard.classList.add('back');
        [firstCard,secondCard]=[null,null];
          },1200);
        }
      }
  };
      const cardgrid=document.getElementById('cardgrid');
      const initgrid=()=>{
        cardgrid.textContent=null;
        for(let i=0;i<suits.length;i++){
          for(let j=0;j<13;j++){
            let div=document.createElement('div');
            let card=cards[i*13+j];
        div.style.backgroundImage=`url(images/${card.front})`;
            div.classList.add('card','back');
        div.onclick=flip;
        div.num=card.num;
            cardgrid.append(div);
          }
        }
      };
      //カードシャッフル
const shuffle=()=>{
    let i=cards.length;
    while(i){
    let index=Math.floor(Math.random()*i--);
    [cards[index],cards[i]]=[cards[i],cards[index]]
    }
  };
    const startBt=document.getElementById('startBt');
    startBt.addEventListener('click',()=>{
        shuffle();
        initgrid();
    }); 
});