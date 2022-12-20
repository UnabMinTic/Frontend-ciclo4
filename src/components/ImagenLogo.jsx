import Logo from 'media/logo.jpg'

const ImagenLogo = ({ altura }) => {
   return (
      <img className={`mx-auto h-${altura} w-auto rounded-full`} src={Logo} alt='Workflow' />
   )
}

export default ImagenLogo;