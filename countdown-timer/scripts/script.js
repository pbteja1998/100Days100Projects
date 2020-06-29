function getTimeRemaining(){
  const d = new Date();
  const h = d.getHours();
  const m = d.getMinutes();
  const s = d.getSeconds();
  const total = (24*60*60) - (h*60*60) - (m*60) - s;
  const seconds = Math.floor((total) % 60)
  const minutes = Math.floor((total/60) % 60)
  const hours = Math.floor((total/(60*60)) % 24)
  const days = Math.floor(total/(60*60*24))

  return {
    total,
    days,
    hours,
    minutes,
    seconds
  };
}

function initializeClock() {
  const hour_1  = document.getElementById('hour-1')
  const hour_2  = document.getElementById('hour-2')
  const minute_1  = document.getElementById('min-1')
  const minute_2  = document.getElementById('min-2')
  const second_1  = document.getElementById('sec-1')
  const second_2  = document.getElementById('sec-2')

  const timeInterval = setInterval(() => {
    const t = getTimeRemaining();
    hour_1.innerText = (Math.floor(t.hours / 10)).toString();
    hour_2.innerText = (t.hours % 10).toString()
    minute_1.innerText = (Math.floor(t.minutes / 10)).toString();
    minute_2.innerText = (t.minutes % 10).toString()
    second_1.innerText = (Math.floor(t.seconds / 10)).toString();
    second_2.innerText = (t.seconds % 10).toString()

    if (t.total <= 0) {
      clearInterval(timeInterval);
    }
  },1000);
}

window.onload = function () {
  initializeClock()
}
