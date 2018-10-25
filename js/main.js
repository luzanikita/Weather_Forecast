var selectedDayId = new Date().getDate();
var arr = dataGenerator(3, 10)
genMonth(1,5);
mainWindow();
showWeek();

function pad (str, max) {
    str = str.toString();
    return str.length < max ? pad("0" + str, max) : str;
}

function daysInMonth(month) {
        return 32 - new Date(new Date().getFullYear(), month, 32).getDate();
    };

function mainWindow()
{
    var id = new Date().getDate()

    var grad = document.getElementById('span1' + id).
    textContent.substring(0, document.getElementById('span1' + id).textContent.length - 2)

    var day = getDay(id)

    document.getElementById('time').value = new Date().getHours();
    document.getElementById('selected-time').textContent = 'Время: ' + pad(new Date().getHours(), 2) + ':00';

    document.getElementById('main-temp-span').textContent = ` ${arr[id - 1][document.getElementById('time').value]}°C`

    document.getElementById('main-date-span').textContent = 
        `Харьков ${day} ${id}.${new Date().getMonth()+1}.18`

    document.getElementById('time').oninput = function() {
        document.getElementById('main-temp-span').textContent = ` ${arr[selectedDayId - 1][this.value]}°C`
        changeImage(document.getElementById('main-temp-span').textContent.trim().
            substring(0, document.getElementById('main-temp-span').textContent.trim().length - 2));
        
        document.getElementById('selected-time').textContent = 'Время: ' + pad(this.value, 2) + ':00';
    }

    changeImage(grad)

    document.getElementById('main-wi').classList.add(`${document.getElementById('day-ico' + selectedDayId).classList[1]}`)
}

function setCurDate() {
    var curDate = new Date()
    document.getElementById('date-month').value = 1 + curDate.getMonth();
    document.getElementById('date-year').value = 1900 + curDate.getYear();
}

function changeDate(direction) {
    var value = document.getElementById('date-month').value

    if (direction == 1) {
        document.getElementById('date-month').value = 1 + (12 + value) % 12
        if (document.getElementById('date-month').value == 1)
            document.getElementById('date-year').value = parseInt(document.getElementById('date-year').value) + 1
    }
    else {
        document.getElementById('date-month').value = 1 + (12 + value - 2) % 12
        if (document.getElementById('date-month').value == 12)
            document.getElementById('date-year').value = parseInt(document.getElementById('date-year').value) - 1
    }
}

function genMonth(b, e) {

    var curDate = new Date()

    setCurDate()

    for(var i = b; i <= e; i++)
    {
        var d = document.createElement('div');
        d.id = i+'div';
        d.className = 'container w-75'
        document.body.appendChild(d);
        var
        row = document.createElement('div');
        row.id = i + 'row'
        row.className = 'row align-items-center'
        document.getElementById(i+'div').appendChild(row)
        for(var j = 1; j <= 7; j++) {
            var id = (i-1)*7 + j;

            if(id > daysInMonth(curDate.getMonth())) 
            {
                for(; j<= 7; j++)
                {
                    var bord = document.createElement('div')
                    bord.id = (i-1)*7 + j;
                    bord.className = 'col day next'
                    document.getElementById(i + 'row').appendChild(bord)  
                }
                break
            }

            var bord = document.createElement('div')
            bord.id = id

            if (bord.id == curDate.getDate())
                bord.className = 'col day active'
            else
                bord.className = 'col day'

            document.getElementById(i + 'row').appendChild(bord)                        

            var dataRow = document.createElement('div');
            dataRow.id = 'DatarRow' + id
            dataRow.className = 'row my-2'

            var span = document.createElement('div');
            span.className = 'mx-auto'
            span.appendChild(document.createTextNode(`${pad(id, 2)}.${curDate.getMonth()+1}.18`))
            dataRow.appendChild(span)

            var InfoRow = document.createElement('div');
            InfoRow.id = 'InfoRow' + id
            InfoRow.className = 'row my-2'

            var ico = document.createElement('i');
            ico.id = 'day-ico' + id
            ico.className = `wi ${randPict()} mx-auto`
            ico.style.fontSize = "32px";

            var grad = document.createElement('span');
            grad.id = 'span1' + id
            grad.appendChild(document.createTextNode(` ${arr[id - 1][curDate.getHours()]}°C`))

            bord.appendChild(dataRow)
            bord.appendChild(InfoRow)
            InfoRow.appendChild(ico)
            ico.appendChild(grad)

            document.getElementById(id).onclick = function() { 
                selectedDayId = this.id  
                mainInfoUpdate(this.id)
                $('.col.day.active').removeClass('active')  
                $(this).addClass('active')
                $("#time").value = 12
                document.body.scrollTop = document.documentElement.scrollTop = 0;
            }
            document.getElementById(id).style.display = 'none'
        }
    }
    document.getElementById('btn-week').onclick = function() {
        document.getElementById('btn-month').classList.remove('selected');
        this.classList.add('selected');
        $('.col.day.active').removeClass('active')
        selectedDayId = curDate.getDate()
        document.getElementById(selectedDayId).classList.add('active')
        mainInfoUpdate(selectedDayId)
        clear();
        showWeek();
    }

    document.getElementById('btn-month').onclick = function() {   
        document.getElementById('btn-week').classList.remove('selected');
        this.classList.add('selected');
        clear();
        showMonth();
    }
}

function randPict()
{
    var temp = ["wi-day-sunny","wi-day-cloudy","wi-day-cloudy-windy","wi-day-rain"]
    return temp[getRandomInt(0,3)];
}

function showWeek()
{
    document.getElementById('date').style.display = 'none'
    var curDate = new Date().getDate();
    var week = Math.floor(curDate/7) + 1;

    for(var j = week; j <= week + 1; j++)
    {
        for(var i = (j - 1)*7 + 1, k = 0; i <= j*7; i++, k++)
        {
            if(i < curDate)
            {
                var bord = document.createElement('div')
                bord.className = 'col day next needRemove'
                document.getElementById(j + 'row').appendChild(bord)
            }
            else
            {
                document.getElementById(j + 'row').appendChild(document.getElementById(i))
                document.getElementById(i).style.display = 'block'
            }
        }
    }
}

function showMonth()
{
    document.getElementById('date').style.display = 'block'
    var curDate = new Date();
    for(var  i = 1; i <= daysInMonth(curDate.getMonth()) + 4; i++)
    {
        document.getElementById(i).style.display = 'block'
    }
}

function clear()
{
    var curDate = new Date();
    $('.needRemove').remove()
    for(var  i = 1; i <= daysInMonth(curDate.getMonth()) + 4; i++)
    {
        document.getElementById(i).style.display = 'none'
    }
}

function mainInfoUpdate(id)
{
    var curDate = new Date()
    document.getElementById('main-temp-span').textContent = ` ${arr[id - 1][document.getElementById('time').value]}°C`

    var day = getDay(id)
                
    var grad = arr[id - 1][document.getElementById('time').value]

    changeImage(grad)

    document.getElementById('main-date-span').textContent = 
    `Харьков ${day} ${id}.${curDate.getMonth() + 1}.18`

    console.log(document.getElementById('day-ico' + selectedDayId).classList[1])

    document.getElementById('main-wi').classList.remove(document.getElementById('main-wi').classList[1])
    document.getElementById('main-wi').classList.add(`${document.getElementById('day-ico' + selectedDayId).classList[1]}`)
}

function getDay(id)
{
    switch (id % 7)
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
    return day
}

function changeImage(grad)
{
    var currHour = document.getElementById('time').value;
    if(currHour <= 4 ||  17 <= currHour)
    {
        if(grad >= 11)
        {
            document.getElementById('main-info').classList.remove("image-clouds")
            document.getElementById('main-info').classList.remove("image-night-rain")
            document.getElementById('main-info').classList.remove("image-sun")
            document.getElementById('main-info').classList.add("image-night")
        }
        else 
        {
            document.getElementById('main-info').classList.remove("image-clouds")
            document.getElementById('main-info').classList.remove("image-sun")
            document.getElementById('main-info').classList.remove("image-night")
            document.getElementById('main-info').classList.add("image-night-rain")
        }
    }
    else
    {
        if(grad >= 11)
        {
            document.getElementById('main-info').classList.remove("image-clouds")
            document.getElementById('main-info').classList.remove("image-night-rain")
            document.getElementById('main-info').classList.remove("image-night")
            document.getElementById('main-info').classList.add("image-sun")
        }
        else 
        {
            document.getElementById('main-info').classList.remove("image-sun")
            document.getElementById('main-info').classList.remove("image-night-rain")
            document.getElementById('main-info').classList.remove("image-night")
            document.getElementById('main-info').classList.add("image-clouds")
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function dataGenerator(min, max)
{
    var arr = [];
    for(var i = 0; i < 31; i++)
    {
        arr.push([]);
        for(var j = 0, minVal = min, maxVal = max; j < 25; j++)
        {
            arr[i].push(getRandomInt(minVal, maxVal));
            if(j < 14)
            {
                minVal++;
                if(j < 12)
                {
                    maxVal++;
                }
            }
            else if(j > 17)
            {
                minVal -= 2;
                maxVal -= 2 ;
            }
        }
    }
    return arr;
}
