import './HorizontalSlider.css'

const HorizontalSlider = ({ items, title }) => {
  const url = 'http://localhost:4000'

  return (
    <div>
      <div className="title">{title}</div>

      {items.map((item) => {
        return (
          <div>
            <img src={url + '/' + item.thumbnail} className="image" />
            <div className="item-title">{item.title}</div>
          </div>
        )
      })}
    </div>
  )
}

export default HorizontalSlider
