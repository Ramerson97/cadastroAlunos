'use client'


import Pagina from '@/app/components/Pagina'
import { Formik } from 'formik'
import { useRouter } from 'next/navigation'
import { Button, Col, Form, Row } from 'react-bootstrap'
import { FaArrowLeft, FaCheck } from "react-icons/fa"
import { v4 } from 'uuid'
import ReactInputMask from 'react-input-mask'
import * as Yup from 'yup'



export default function AlunosFormPage(props) {
  const router = useRouter();


  const alunos = JSON.parse(localStorage.getItem('alunos')) || [];

  const faculdades = JSON.parse(localStorage.getItem('faculdades')) || [];
  const cursos = JSON.parse(localStorage.getItem('cursos')) || [];

  const id = props.searchParams.id
  console.log(props.searchParams.id)
  const alunoEditado = alunos.find(item => item.id === id)


  function salvar(dados) {
    console.log('Dados recebidos no onSubmit:', dados);
    if (alunoEditado) {
      Object.assign(alunoEditado, dados)
      localStorage.setItem('alunos', JSON.stringify(alunoEditado))


    } else {
      dados.id = v4()
      alunos.push(dados)
      localStorage.setItem('alunos', JSON.stringify(alunos))

    }
    alert('aluno adicionada com sucesso!')
    router.push('/alunos')
  }


  //CAMPO FORM, VALORES INICIAIS
  const initialValues = {
    nome: '',
    sobrenome: '',
    telefone: '',
    dataNascimento: '',
    email: '',
    faculdade: '',
    curso: '',
    periodo: '',
    matricula: '',
    foto: ''

  }

  const validation = Yup.object().shape({
    nome: Yup.string().required("Campo obrigatório"),
    sobrenome: Yup.string().required("Campo obrigatório"),
    telefone: Yup.string().required("Campo obrigatório"),
    dataNascimento: Yup.date().required("Campo obrigatório"),
    email: Yup.string().email("E-mail inválido").required("Campo é obrigatório"),
    faculdade: Yup.string().required("Campo obrigatório"),
    curso: Yup.string().required("Campo obrigatório"),
    periodo: Yup.string().required("Campo obrigatório"),
    matricula: Yup.string().required("Campo obrigatório"),
    foto: Yup.string().required("Campo obrigatório")

  })

  return (
    <Pagina titulo={'Cadastro de Alunos'}>

      <Formik
        initialValues={alunoEditado || initialValues}
        validationSchema={validation}
        onSubmit={salvar}
      >
        {
          ({ values, touched, errors, handleBlur, handleChange, handleSubmit }) => {
            return (
              <Form onSubmit={handleSubmit}>

                <div>
                  <h2 className='text-center'>Dados Pessoais</h2>
                </div>
                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>Nome:</Form.Label>
                    <Form.Control
                      name='nome'
                      type='text'
                      value={values.nome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.nome && !errors.nome}
                      isInvalid={touched.nome && errors.nome}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.nome}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Sobrenome:</Form.Label>
                    <Form.Control
                      name='sobrenome'
                      type='text'
                      value={values.sobrenome}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.sobrenome && !errors.sobrenome}
                      isInvalid={touched.sobrenome && errors.sobrenome}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.sobrenome}</Form.Control.Feedback>
                  </Form.Group>

                  <Row>
                    <Form.Group as={Col}>
                      <Form.Label>E-mail:</Form.Label>
                      <Form.Control
                        name='email'
                        type='email'
                        value={values.email}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.email && !errors.email}
                        isInvalid={touched.email && !!errors.email}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.email}</Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group as={Col}>
                      <Form.Label>Data de Nascimento:</Form.Label>
                      <Form.Control
                        name='dataNascimento'
                        type='date'
                        value={values.dataNascimento}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isValid={touched.dataNascimento && !errors.dataNascimento}
                        isInvalid={touched.dataNascimento && !!errors.dataNascimento}
                      />
                      <Form.Control.Feedback type='invalid'>{errors.dataNascimento}</Form.Control.Feedback>
                    </Form.Group>



                  </Row>


                </Row>

                <Row className='mb-2'>
                  <Form.Group as={Col}>
                    <Form.Label>Telefone:</Form.Label>
                    <Form.Control as={ReactInputMask}
                      mask="(99) 99999-9999"

                      name='telefone'
                      type='text'
                      value={values.telefone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.telefone && !errors.telefone}
                      isInvalid={touched.telefone && errors.telefone}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.telefone}</Form.Control.Feedback>
                  </Form.Group>


                </Row>

                <div className='text-center'>
                  <h2>Dados Acadêmicos</h2>
                </div>

                <Row>
                  <Form.Group as={Col}>
                    <Form.Label>Faculdade:</Form.Label>
                    <Form.Select
                      name='faculdade'
                      value={values.faculdade}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.faculdade && !errors.faculdade}
                      isInvalid={touched.faculdade && errors.faculdade}
                    >
                      <option value=''>Selecione</option>
                      {faculdades.map(faculdade => <option value={faculdade.nome}> {faculdade.nome}</option>)}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.faculdade}</Form.Control.Feedback>
                  </Form.Group>


                  <Form.Group as={Col}>
                    <Form.Label>Cursos:</Form.Label>
                    <Form.Select
                      name='curso'
                      value={values.curso}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.curso && !errors.curso}
                      isInvalid={touched.curso && errors.curso}
                    >
                      <option value=''>Selecione</option>
                      {cursos.map(curso => <option value={curso.nome}> {curso.nome}</option>)}
                    </Form.Select>
                    <Form.Control.Feedback type='invalid'>{errors.curso}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col} >
                    <Form.Label>Periodo </Form.Label>
                    <Form.Select
                      name='periodo'
                      type="text"
                      value={values.periodo}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.periodo && !errors.periodo}
                      isInvalid={touched.periodo && !!errors.periodo}

                    >
                      <option>Selecione</option>

                      <option value="Matutino ">Matutino</option>
                      <option value="Vespertino">Vespertino</option>
                      <option value="Noturno">Noturno</option>



                    </Form.Select>
                    <Form.Control.Feedback type="invalid">{errors.tipo}</Form.Control.Feedback>
                  </Form.Group>



                </Row>

                <Row>

                  <Form.Group as={Col}>
                    <Form.Label>Matricula:</Form.Label>
                    <Form.Control
                      name='matricula'
                      type='text'
                      value={values.matricula}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.matricula && !errors.matricula}
                      isInvalid={touched.matricula && errors.matricula}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.matricula}</Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Label>Foto:</Form.Label>
                    <Form.Control
                      name='foto'
                      type='text'
                      placeholder='Adcione o link da foto nesse local'
                      value={values.foto}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isValid={touched.foto && !errors.foto}
                      isInvalid={touched.foto && !!errors.foto}
                    />
                    <Form.Control.Feedback type='invalid'>{errors.foto}</Form.Control.Feedback>
                  </Form.Group>

                </Row>



                {/* botões */}
                <Form.Group className='text-end'>
                  <Button className='me-2' href='/faculdades'><FaArrowLeft /> Voltar</Button>
                  <Button variant='success' type='submit'><FaCheck /> Enviar</Button>
                  <Button variant='success' onClick={() => console.log(errors)}><FaCheck /> Teste</Button>
                </Form.Group>

              </Form>
            )

          }
        }

      </Formik>

    </Pagina>
  )
}
