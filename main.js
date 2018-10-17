window.onload=render(1,4);

function render(b, e) {
    for(var i = b; i <= e; i++)
    {
        var d = document.createElement('div');
        d.id = i+'div';
        d.className = 'container w-50'
        document.body.appendChild(d);
        var
        row = document.createElement('div');
        row.id = i + 'row'
        row.className = 'row align-items-center my-2'
        document.getElementById(i+'div').appendChild(row)
        for(var j = 1; j <= 7; j++) {
            
            var id = (i-1)*7 + j;

            var bord = document.createElement('div')
            bord.id = id
            bord.className = 'col day'
            document.getElementById(i + 'row').appendChild(bord)                        

            var dataRow = document.createElement('div');
            dataRow.id = 'DatarRow' + id
            dataRow.className = 'row my-2'

            var span = document.createElement('div');
            span.className = 'mx-auto'
            span.appendChild(document.createTextNode(id + '.10.18'))
            dataRow.appendChild(span)

            var icoRow = document.createElement('div');
            icoRow.id = 'IcoRow' + id
            icoRow.className = 'row my-2'

            var ico = document.createElement('i');
            ico.id = 'month-ico'
            ico.className = 'wi wi-night-sleet mx-auto'
            icoRow.appendChild(ico)

            var gradRow = document.createElement('div');
            gradRow.id = 'GradRow' + id
            gradRow.className = 'row my-3 month'

            var inGradRow = document.createElement('div');
            inGradRow.id = 'inGradRow' + id
            inGradRow.className = 'mx-auto'

            var span1 = document.createElement('span');
            span1.id = 'span1' + id
            span1.appendChild(document.createTextNode(getRandomInt(5,15) + '°C'))
            inGradRow.appendChild(span1)

            gradRow.appendChild(inGradRow)
            bord.appendChild(dataRow)
            bord.appendChild(icoRow)
            bord.appendChild(gradRow)

            document.getElementById(bord.id).onclick = function()
            {
                document.getElementById('main-temp-span').textContent = 
                " " + document.getElementById('span1' + this.id).textContent
                switch (this.id%7)
                {
                    case 1:
                        var day = 'Пн'
                        break
                    case 2:
                        var day = 'Вт'
                        break
                    case 3:
                        var day = 'Ср'
                        break
                    case 4:
                        var day = 'Чт'
                        break
                    case 5:
                        var day = 'Пт'
                        break
                    case 6:
                        var day = 'Сб'
                        break
                    default:
                        var day = 'Вс'
                        break
                }
                document.getElementById('main-date-span').textContent = `Харьков ${day} ${this.id}.10.19`
            }
        }
    }          
}



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}


$('.day').on('click', 'div', function(){
    $(this).addClass('active')
});