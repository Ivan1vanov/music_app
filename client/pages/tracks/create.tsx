import { Button, Grid, TextField } from '@mui/material';
import React, { useState } from 'react'
import FileUpload from '../../components/FileUpload';
import StepCreate from '../../components/StepCreate';
import Layout from '../../layouts/Layout';
import { useInput } from '../../hooks/UseInput';
import axios from 'axios';
import { useRouter } from 'next/router';

const create = () => {

    const router = useRouter()

    const [currentStep, setCurrentStep] = useState(0)

    const [cover, setCover] = useState(null)
    const [audio, setAudio] = useState(null)

    const name = useInput('')
    const artist = useInput('')
    const text = useInput('')


    const next = () => {
        if(currentStep !== 2) {
            setCurrentStep(prev => prev + 1)
        } else {
            const formData = new FormData()
            formData.append('name', name.value)
            formData.append('artist', artist.value)
            formData.append('picture', cover)
            formData.append('audio', audio)
            formData.append('text', text.value)
            axios.post('http://localhost:5000/tracks', formData)
            .then(resp => router.push('/tracks'))
            .catch(e => console.log(e))
        }
    }

    const back = () => {
        setCurrentStep(prev => prev - 1)
    }

  return (
    <div>
        <Layout>
        <Grid container justifyContent='center'>
           
        </Grid>
            <StepCreate activeStep={currentStep}>
            {currentStep === 0 && 
            <Grid container direction='column' justifyContent='center'
            style={{padding: '5px'}}
            >
                <TextField
                {...name}
                label='Track name'
                style={{margin: '5px 0'}}
                />
                 <TextField
                {...artist}
                label='Artist name'
                style={{margin: '5px 0'}}
                />
                 <TextField
                {...text}
                label='Lirycs'
                multiline
                rows={4}
                style={{margin: '5px 0'}}
                />
            </Grid>
            }
            {currentStep === 1 && 
            <FileUpload setFile={setCover} accept='image/*'>
                <Button>Upload image</Button>    
            </FileUpload>
            }
            {currentStep === 2 && 
            <FileUpload setFile={setAudio} accept='audio/*'>
            <Button>Upload audio</Button>    
            </FileUpload>
            }
            </StepCreate>
            <Grid container justifyContent='space-around'>
            <Button disabled={currentStep === 0} onClick={() => back()}>Back</Button>
            <Button onClick={() => next()}>Next</Button>
            </Grid>
        </Layout>
    </div>
  )
}

export default create