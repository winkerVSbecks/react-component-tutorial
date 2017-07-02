const API_KEY = '581522ec0b69c0bcc097344d84601245';



const Weather = ({ temp, description, icon }) => (
  <div className="bw2 ba blue dib pa3 bg-washed-blue">

    <div className="flex items-stretch mb2">
      <img src={icon} />

      <header className="ml3">
        <h1 className="f7 ttu tracked mt0 mb2 flex-auto dark-blue">Toronto</h1>
        <p className="f3 mv0">{ temp } ℃</p>
      </header>
    </div>

    <p className="mv0 f5 ttc">{ description }</p>
  </div>
);


class App extends React.Component {

  constructor(props) {                // where do we hook up these props to ? where does this prop data come from?
  super(props);                       // what is the purpose of this? why do we need to call super?
  this.state = {
  temp: 0,
  description: 'not loaded yet',
  icon: `http://openweathermap.org/img/w/10d.png`};  // always intialize a state? is the state to be updated by passing in props?
  // this.reshapeData = this.reshapeData.bind(this)  // when do we need to bind and when not (I've seen both...)
  this.render()                       // was i supposed call render here? (I didn't and the card didn't show for a bit upon load)
}

 getWeather() {
    return fetch(`http://api.openweathermap.org/data/2.5/weather?id=6167865&appid=581522ec0b69c0bcc097344d84601245&units=metric`)
      .then(res => {
        // console.log(37,res && res.json())     // when I uncomment this... I get error "promise already used" why?
        return res.json()})
      .then((dt)=>{
        console.log(40, dt)
        this.reshapeData(dt)
      })
  }

   reshapeData(data) {
    console.log(data)
    this.setState({
      temp: `${data.main.temp} timestamp: ${+ new Date()}`,       // I added random time stamp for easier debugging... plz ignore
      description: data.weather[0].description,
      icon: `http://openweathermap.org/img/w/${"09d"}.png` 
    }
    )
  }

componentDidMount() {
    this.timerID = setInterval(() => this.getWeather(), 15000); // is this.timerID a prop or a state?

  }

  componentWillUnmount() {
  clearInterval(this.timerID);                 // how does it know when to unmount? what is I didn't clear the interval?                                   // typically do I need to try and clean up in componentWillUnmount
}
render() {
   return (
  <Weather
    temp={this.state.temp}
    description={this.state.description}
    icon={this.state.icon} //"http://openweathermap.org/img/w/10d.png"
  />
)
}

}




ReactDOM.render(<App />, document.getElementById('exercise'));
