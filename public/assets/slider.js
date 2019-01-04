$(function() {
    console.log('hello mati')

    let size = +($('.difficulty').attr('difficulty'))
    let timer
    let time = 0
    let maxTime = +($('.time').attr('time'))
    window._time = time

    let $tiles = $('.tile')
    $tiles.on('click', click)
    
    function click() {
        let tile = this
        let ns = neighbors(this)
        ns.each(function() {
            if ($(this).hasClass('empty')) {
                swapAnimated(tile, this)
                if (isSolved()){
                    win()
                }
            } 
        })
    }

    function swapAnimated(originTile, targetTile, callback) {
        let div1 = $(originTile)
        div1.addClass('moving')
        let div2 = $(targetTile)

        tdiv1 = div1.clone()
        tdiv2 = div2.clone()

        let x = div2.position().left - div1.position().left
        let y = div2.position().top - div1.position().top

        div1.replaceWith(tdiv2);
        div2.replaceWith(tdiv1);
        console.log(div1)
        $('.moving').css({
            // transition: 'none',
            transform: `translate(${-x}px, ${-y}px)`,
            // border: '1px solid red',
        })
        setTimeout(() => {
            $('.moving').css({
            // transition: 'all .3s ease',
                transform: 'translate(0, 0)'
            })
            $('.moving').removeClass('moving')
            if (callback) callback
        }, 1)
        $tiles = $('.tile')
        $tiles.click(click)
    }

    function swap(t1, t2) {
        // console.log('swap\n', t1, t2)
        div1 = $(t1); //clicked

        div2 = $(t2); //target
        
        tdiv1 = div1.clone();
        tdiv2 = div2.clone();
        
        if(!div2.is(':empty')){
            div1.replaceWith(tdiv2);
            div2.replaceWith(tdiv1);
        }
        $tiles = $('.tile')
        $tiles.click(click)
    }


    function win() {
        $tiles.css({
            ' -webkit-box-shadow': 'none',
            '-moz-box-shadow': 'none',
            'box-shadow': 'none',
            'border' : 'none',
            'color' : 'transparent'
        })
        $tiles.unbind('click')
        $tiles.animate({
            // 'border-width': 0,
            // height: '100px',
            // width: '100px'
        }, 2000)
        $('.empty').animate({
            opacity: 1
        }, 1000)
        clearInterval(timer)
    }
    function coordinates(tile) {
        let i = $tiles.index(tile)
        let row = Math.floor(i / size)
        let col = i % size
        return {
            row: row, col: col
        }
    }

    function dist(c1, c2) {
        return Math.abs(c1.row - c2.row) + Math.abs(c1.col - c2.col)
    }

    function neighbors(tile) {
        let c1 = coordinates(tile)
        return $tiles.filter(function(index) {
            let tile2 = $tiles.get(index)
            // console.log(tile2)
            let c2 = coordinates(tile2)
            // console.log(c1, c2, dist(c1, c2))
            return dist(c1, c2) == 1
        })
    }
    
    function shuffle() {
        var i = 0
        clearInterval(timer)
        function swap2() {
            let $empty = $('.empty')
            let ns = neighbors($empty.get(0))
            // console.log(ns)
            let k = getRandomInt(ns.length)
            swap($empty.get(0), ns.get(k))
            i += 1
            if (i < size * size * 16) {
                setTimeout(swap2, 5)
            }
            else {
                timer = setInterval(function() {
                    time += 1
                    $('.timer h3').html(`${Math.floor(time / 60)}:${time % 60 < 10 ? '0' + time % 60 : time % 60}`)
                    if (time % 45 == 0) {
                        runCat()
                    }
                    if (time == maxTime - 60) {
                        startTimerBlink()
                    }
                    if (time == maxTime) {
                        stopTimerBlink()
                        $tiles.unbind('click')
                        time = 0
                        shuffle()
                    }
                }, 1000)
            }
        }
        setTimeout(swap2, 1000)
    }

    function isSolved() {
        for (var i = 0; i < size*size; ++i) {
            if ($($tiles.get(i)).attr('index') != i) return false
        }
        return true
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max))
    }

    function resize() {
        console.log('resize')
        
        let width = Math.min(1000, Math.min($(window).height(), $(window).width()))
        let tileWidth = Math.floor((width-20) / size)
        $('.puzzle').css({
            width: width + 'px',
            height: width + 'px',
        })
        $('.timer').css({
            width: width + 'px',
        })
        $tiles.css({
            width: tileWidth - 2 + 'px',
            height: tileWidth - 2 + 'px',
            'line-height': tileWidth - 4 + 'px',
        })
        $tiles.css({
            'background-size': size * tileWidth + 'px'
        })
    }

    $(window).resize(resize)
    resize()

    function create() {
        let $puzzle = $('.puzzle')
        for (var i = 0; i < size*size - 1; i++) {
            let row = Math.floor(i / size)
            let col = i % size
            $puzzle.append(`
            <div class='tile' index='${i}' style='background-position: ${col * 100 / (size-1)}% ${row * 100 / (size-1)}%;'>
            ${i+1}
            </div>
            `)
        }
        $puzzle.append(`<div class='tile empty' index='${size*size - 1}' style='background-position: 100% 100%;'>&nbsp;</div>`)
        $tiles = $('.tile')
        $tiles.on('click',click)
        resize()
        setTimeout(resize,1000)
    }
    create()
    shuffle()


    let $cat = $('.cat')
    function initCat() {
        $cat.on('click', function() {
            $cat.stop()

            $('.tile:not(.empty)').animate({
                opacity: 0
            }, 1500)
            
            
            setTimeout(function() {
                $cat.css({'display' : 'none'})
                $('.tile:not(.empty)').css({color: 'rgba(255,255,255,0.5)'})
                $('.tile:not(.empty)').animate({
                    opacity: 1
                }, 1500)
            }, 1500)
        })
    }
    function runCat() {
        $cat.css({
            bottom: 0,
            left: '-120px'
        })
        $cat.animate({
            bottom: '100px',
            left: $(window).width() + 120 + 'px'
        }, 3500)
    }
    initCat()

    let blinking = false
    function startTimerBlink() {
        console.log('blink')
        let $h3 = $('.timer h3')
        console.log($h3)
        let time = 1000
        blinking = true
        function on () {
            $h3.animate({color: 'rgba(255,0,0,1)'}, time, () => {
                time = time - 15
                off()
            })
        }
        function off() {
            $h3.animate({color: 'rgba(255,255,255,0.5)'}, time, () => {
                if (blinking) on()
            })
        }
        on()
    }
    function stopTimerBlink() {
        $('.timer h3').css('color', 'rgba(255,255,255,0.5)')
        blinking = false
    }
})