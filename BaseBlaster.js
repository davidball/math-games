$(function() {
    var baseBlaster = {
        base: 2,
        speed: 150000,
        maxNumber: 50,
        init: function() {
            $('#input').submit(function(ev) {
                var userInput = ev.target[0].value;
                if (userInput == baseBlaster.activeQuestion) {
                    $('body').css('background-color', 'green');
                    baseBlaster.activeQuestionDOM.stop().hide('slow');
                    baseBlaster.addNumber();
                    baseBlaster.speed = baseBlaster.speed - 0.1 * baseBlaster.speed;

                    var score = parseInt($('#score').text());

                    var top = parseInt($('.number:last').css('top'));

                    var height = $('#baseBlaster').height();

                    var where = 100 * (1 - top / height);

                    score += where;
                    $('#score').text(score);
                    
                }
                else {
                    $('body').css('background-color', 'red');
                    baseBlaster.speed = baseBlaster.speed + 0.1 * baseBlaster.speed;
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

            var bbWidth = $('#baseBlaster').width();
            var nDOMWidth = nDOM.width();
            nDOM.css('left', (bbWidth - nDOMWidth) / 2 - 15);

            nDOM.animate({
                top: 500
            },
            baseBlaster.speed,
            function() {
                nDOM.append(' = ' + n + '<sub>10</sub>').appendTo('#unsolved');
                baseBlaster.addNumber();
            });
            this.activeQuestion = n;
            this.activeQuestionDOM = nDOM;
        }
    };
    window.baseBlaster = baseBlaster;
    baseBlaster.run()
});