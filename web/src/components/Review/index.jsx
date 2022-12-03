import { Container } from './styles'

import { FiStar } from 'react-icons/fi'
import theme from '../../styles/theme'

import { Tag } from '../Tag'

export function Review({data, onClick, ...rest}) {
  const rate = data.rating;
  const rateArray = new Array(rate).fill(1)
  const dif = new Array(5 - rate).fill(1);
  return (
         
    <Container {...rest} onClick={onClick}>
    <h1>{data.title}</h1>
        <div className="rating">
          {
            rateArray.map((element, index) => 
              (<FiStar key={index} fill={theme.COLORS.RED}/>)
            )
          }
          {
            dif.map((element, index) => 
            (<FiStar key={index} />)
            )
          }
        </div>
        <div className="description">
          {data.description}
        </div>
        <div className='tags'>
          {
            data.tags.map(tag => <Tag title={tag.name} key={tag.name}/>)
          }
        </div>
      </Container>

    
  )
}