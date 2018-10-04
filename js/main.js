window.onload=function() {
    for(var i = 1; i <= 4; i++){
        var
        d = document.createElement('div');
        d.id = i+'div';
        d.className = 'container w-75'
        document.body.appendChild(d);
        var
        row = document.createElement('div');
        row.id = i + 'row'
        row.className = 'row align-items-center my-2'
        document.getElementById(i+'div').appendChild(row)
        for(var j = 1; j <= 7; j++) {
            
            var bord = document.createElement('div')
            bord.id = ((i-1)*7 + j)
            bord.className = 'col border-right'
            document.getElementById(i + 'row').appendChild(bord)                        

            var dataRow = document.createElement('div');
            dataRow.id = 'DatarRow' + ((i-1)*7 + j)
            dataRow.className = 'row my-2'

            var span = document.createElement('div');
            span.className = 'mx-auto'
            span.appendChild(document.createTextNode('Пн, ' + ((i-1)*7 + j) + '.10.18'))
            dataRow.appendChild(span)

            var icoRow = document.createElement('div');
            icoRow.id = 'IcoRow' + ((i-1)*7 + j)
            icoRow.className = 'row my-2'

            var ico = document.createElement('i');
            ico.id = 'month-ico'
            ico.className = 'wi wi-night-sleet mx-auto'
            icoRow.appendChild(ico)

            var gradRow = document.createElement('div');
            gradRow.id = 'GradRow' + ((i-1)*7 + j)
            gradRow.className = 'row my-3 month'

            var inGradRow = document.createElement('div');
            inGradRow.id = 'inGradRow' + ((i-1)*7 + j)
            inGradRow.className = 'mx-auto'

            var span1 = document.createElement('span');
            span1.appendChild(document.createTextNode(getRandomInt(5,15)))
            inGradRow.appendChild(span1)

            var span2 = document.createElement('span');
            span2.appendChild(document.createTextNode('°C'))
            inGradRow.appendChild(span2)

            gradRow.appendChild(inGradRow)
            bord.appendChild(dataRow)
            bord.appendChild(icoRow)
            bord.appendChild(gradRow)

        }
    }
                        
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}