$(function() {
    var baseBlaster = {
        base: 2,
        speed: 1500000,
        maxNumber: 50,
        init: function() {
            $('#speed').change(function() {
                baseBlaster.setupAnimation();
            });
            $('#input').submit(function(ev) {
                var userInput = ev.target[0].value;
                if (userInput == baseBlaster.activeQuestion) {
                    $('body').css('background-color', '#33FF99');
                    ev.target[0].value=null;
                    baseBlaster.incrementSpeed(10);
                    baseBlaster.speed = baseBlaster.speed - 0.1 * baseBlaster.speed;

                    var score = parseInt($('#score').text());

                    var top = parseInt($('#baseBlaster .number:first').css('top'));

                    var height = $('#baseBlaster').height();

                    var where = 10 + 10* parseInt(10 * (1 - top / height));
             
                    score += where;
                    $('#score').text(score);
                    var nDOM = baseBlaster.activeQuestionDOM;
                    
                    nDOM.stop().hide('slow',function() {nDOM.remove();console.log('remove')});
                    baseBlaster.addNumber();
                }
                else {
                    $('body').css('background-color', 'red');
                    baseBlaster.incrementSpeed(10);
                }
                return false;
            })
        },
        run: function() {
            this.init();
            this.addNumber();
        },
        decimalToTargetBase: function(n, base) {
            var powers = [];
            var biggest = 0;
            var index = 0;
            while (biggest < n) {
                biggest = Math.pow(base, index);
                if (biggest <= n) {
                    powers.push(biggest);
                }
                index++;
            }

            var converted = '';
            diff = n;

            for (var i = powers.length - 1; i >= 0; i--) {
                var div = parseInt(diff / powers[i]);
                if (i > 0 && i<powers.length-1 && i % 3 === 2) {
                    converted += ',';
                }
                converted += div;

                diff -= div * powers[i];

            };

            return converted;
        },
        incrementSpeed:function(percent) {
            var curSpeed = this.getSpeed();
            var newSpeed = Math.round(curSpeed + (percent/100) * curSpeed);            
            this.setSpeed(newSpeed);  
        },
        getSpeed:function() {
          return 60 - parseInt($('#speed').val());  
        },
        setSpeed:function(seconds) {
            $('#speed').val(60-seconds);
            this.speed = seconds * 1000;
        },
        setupAnimation:function() {
            var nDOM = $('#baseBlaster .number:first');
            
            var blasterDOM = $('#baseBlaster');


            nDOM.stop().animate({
                top: blasterDOM.height() + 'px'
            },
            this.getSpeed() * 1000,
            'linear',
            function() {
                nDOM.append(' = ' + n + '<sub>10</sub>').appendTo('#unsolved');
                baseBlaster.addNumber();
            });
            
        },
        addNumber: function() {

            baseBlaster.maxNumber = $('#maxValue').val() || 100;

            var n = parseInt(Math.random() * baseBlaster.maxNumber + 1);

            var base = $('#base').val();
            if (!base || !base > 1) {
                base = parseInt(Math.random() * 10);
                //                this.base = base;
                //                $('#base').val(base);
            }
            var converted = this.decimalToTargetBase(n, base);

            var nDOM = $('<div class="number"/>').attr('data-number', n).css('top', 0).text(converted).appendTo('#baseBlaster');

            $('<sub/>').text(base).appendTo(nDOM);

            var blasterDOM = $('#baseBlaster');
            var bbWidth = blasterDOM.width();
            var nDOMWidth = nDOM.width();
            nDOM.css('left', (bbWidth - nDOMWidth) / 2 - 15);

            this.setupAnimation();
            
            this.activeQuestion = n;
            this.activeQuestionDOM = nDOM;
        }
    };
    window.baseBlaster = baseBlaster;
    baseBlaster.run()
});