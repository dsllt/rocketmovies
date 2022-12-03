import { Container } from './styles'

export function ButtonText({title, onClick, icon: Icon, ...rest}) {
  return (
    <Container {...rest} onClick={onClick}>
      {Icon && <Icon size={16}/>}
      {title}
    </Container>
  )
}