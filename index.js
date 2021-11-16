
let windowWidth;
let windowHeight;

let scrollY = 0;
let relativeScrollY = 0;
let totalScrollHeight = 0;
let currenScene = 0;
let calAnimationVal;

let prevDurations = 0;
let pixelDuration = 0;

// scene 0, 1, 2, 3, 4
let animationKeyframes = [
    { // 자동차 나타나기
        animationVal:{
            carMove:[-700, 0]
        }
    },
    { // 자동차 중앙선 침범
        animationVal:{
            carMove:[0, 400]
        }
    },
    { // 사고나고 사라지기
        animationVal:{
            opacity:[0, 1],
        }
    },
    { // 중앙선 결과 나타나기
        animationVal:{
            opacity:[0, 1]
        }
    },
    { // 중앙선 결과 사라지기
        animationVal:{
            time:[0, 100]
        }
    },
    { // 중앙선 결과 사라지기
        animationVal:{
            carAMove:[0, 400],
            carBMove:[300, 0]
        }
    },
    { // 자동차 나타나기-y
        animationVal:{
            carMove:[0, 400]
        }
    },
    { // 자동차 나타나기-y
        animationVal:{
            carMove:[50, 0]
        }
    }
    

]

let elemBody = document.body;

function init()
{
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    render();
    resizeHandler();
    window.addEventListener('scroll', scrollHandler);
    window.addEventListener('resize', resizeHandler);
}

function scrollHandler()
{
    scrollY = window.pageYOffset;

    if(scrollY < 0 || scrollY > (totalScrollHeight - windowHeight))
    {
        return;
    }

    if(scrollY > pixelDuration+prevDurations)
    {
        prevDurations += pixelDuration;
        currenScene++;
    }
    else if(scrollY < prevDurations)
    {
        currenScene--;
        prevDurations -= pixelDuration;
    }

    relativeScrollY = scrollY - prevDurations;

    render(currenScene);
}

function resizeHandler() //애니메이션 프래임 수를 조정한다.
{
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;

    totalScrollHeight = 0;
    pixelDuration = windowHeight * 0.5;

    for( let i = 0; i < animationKeyframes.length; i++)
    {
        totalScrollHeight += pixelDuration;
    }
    totalScrollHeight += windowHeight;

    elemBody.style.height = totalScrollHeight + 'px';
}

(function() {
   const outputElem = document.querySelector('.output');
   window.addEventListener('scroll', function() {
      outputElem.innerHTML = window.pageYOffset;
   });

})();
function render(nowState)
{
    let targetElem = document.querySelectorAll('.sa');

    switch(nowState)
    {
        case 0:{
            let moveVal;
            let scrollAniElem = targetElem[0];
            moveVal = calcAni(animationKeyframes[0].animationVal.carMove);
            opacityVal = calcAni(animationKeyframes[3].animationVal.opacity);
            scrollAniElem.style.transform = 'translateY(' + moveVal + 'px)';

        }break;
        case 1:{
            let moveVal, opacityVal;
            let scrollAniElem = targetElem[0];
            let scrollAniElem1 = targetElem[1];
            moveVal = calcAni(animationKeyframes[1].animationVal.carMove);
            opacityVal = calcAni(animationKeyframes[3].animationVal.opacity);
            scrollAniElem.style.transform = 'translateX(' + moveVal+ 'px)';
            scrollAniElem1.style.opacity = opacityVal;

        }break;
        case 2:{
            let moveVal, moveVal1;
            let scrollAniElem = targetElem[0];
            let scrollAniElem1 = targetElem[1];
            moveVal = calcAni(animationKeyframes[0].animationVal.carMove);
            moveVal1 = calcAni(animationKeyframes[7].animationVal.carMove)
            scrollAniElem.style.transform = 'translateY(' + moveVal + '-700px)';
            scrollAniElem1.style.transform = 'translateY(' + moveVal1 + 'px)';
        }break;
        case 3:{
            let moveVal;
            let scrollAniElem = targetElem[0];
            moveVal = calcAni(animationKeyframes[0].animationVal.carMove);
            scrollAniElem.style.transform = 'translateY(' + moveVal + '-700px)';
        }break;
        case 4:{
            let opacityVal;
            opacityVal = calcAni(animationKeyframes[3].animationVal.opacity);
            scrollAniElem.style.opacity = opacityVal;
        }break;
        case 5:{

        }break;
        case 6:{
            let moveVal, moveValB;
            let scrollAniElem = targetElem[1];
            let scrollAniElemB = targetElem[2];
            moveVal = calcAni(animationKeyframes[1].animationVal.carMove);
            moveValB = calcAni(animationKeyframes[7].animationVal.carMove); 
        }break;
        case 7:{
            let moveVal, moveValB;
            let scrollAniElemB = targetElem[2];
            moveVal = calcAni(animationKeyframes[1].animationVal.carMove);
            moveValB = calcAni(animationKeyframes[7].animationVal.carMove);

            scrollAniElemB.style.transform = 'translateY(' + moveValB+ 'px)'; 
        }break;
    }
}

function calcAni(value)
{
    return( relativeScrollY / pixelDuration) * (value[1] - value[0]) + value[0];
}

init();