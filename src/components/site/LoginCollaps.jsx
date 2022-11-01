// 	<Grid item xs={12}>
//     <CollapsableBox title='Login to your IOM Account' defaultOpen>
//         <Grid container spacing={3} sx={{ mt: '0', mb: '20px' }}>
//             <Grid container item md={6} spacing={2}>
//                 <Grid item xs={12}>
//                     <CustomTextField label={<InputLabel title='Username' />} placeholder='Enter username' size='small' />
//                 </Grid>
//                 <Grid item xs={12}>
//                     <CustomTextField label={<InputLabel title='Password' />} placeholder='Enter password' size='small' />
//                 </Grid>
//                 <Grid container item xs={12}>
//                     <Grid item xs={7}>
//                         <Typography variant='caption' fontWeight={500}>
//                             <Checkbox sx={{ padding: 0, mr: '8px', mt: '-2px' }} size='small' />
//                             Remember me
//                         </Typography>
//                     </Grid>
//                     <Grid item xs={5}>
//                         <Typography
//                             variant='subtitle2'
//                             color='text.greyLight'
//                             fontWeight={500}
//                             component={Link}
//                             to=''
//                             textAlign='center'
//                         >
//                             Forgot Password?
//                         </Typography>
//                     </Grid>
//                 </Grid>
//                 <Grid item xs={12}>
//                     <Button variant='contained' color='darkYellow' sx={{ padding: '10px 16px' }} fullWidth>
//                         <Typography variant='body2' component='div' fontWeight='bold' color='inherit'>
//                             Log In
//                         </Typography>
//                     </Button>
//                 </Grid>
//                 <Grid item xs={12}>
//                     <Typography variant='subtitle2' color='#212121'>
//                         Don’t have an account ?
//                         <Typography
//                             variant='subtitle2'
//                             fontWeight='bold'
//                             color='text.darkBlue'
//                             component='span'
//                             onClick={() => setOpen(true)}
//                             sx={{ cursor: 'pointer' }}
//                         >
//                             Signup now
//                         </Typography>
//                     </Typography>
//                 </Grid>
//             </Grid>

//             <Grid item md={1} xs={12}>
//                 <Divider orientation={!screenWidthIsMd ? 'vertical' : 'horizontal'}>
//                     <Typography variant='subtitle2' color='#BDBDBD' fontWeight='bold'>
//                         or
//                     </Typography>
//                 </Divider>
//             </Grid>
//             <Grid item md={5} xs={12}>
//                 <div className='center' style={{ flexDirection: 'column', height: '100%' }}>
//                     <Typography variant='subtitle2' color='#212121' component='div' sx={{ mb: '16px', width: '100%' }}>
//                         Log in using
//                     </Typography>
//                     <SocialIconButton
//                         icon={<DeleteIcon />}
//                         label={<Typography variant='caption'>Login with Facebook</Typography>}
//                         sx={{ padding: '8px', mb: '16px' }}
//                         fullWidth
//                     />
//                     <SocialIconButton
//                         icon={<DeleteIcon />}
//                         label={<Typography variant='caption'>Login with Google</Typography>}
//                         color='error'
//                         sx={{ padding: '8px' }}
//                         fullWidth
//                     />
//                 </div>
//             </Grid>
//         </Grid>
//     </CollapsableBox>
// </Grid>
