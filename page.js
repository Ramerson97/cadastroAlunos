'use client';

import React, { useEffect, useState } from 'react';
import Pagina from '../components/Pagina';
import { Button, Table } from 'react-bootstrap';

export default function ListaDeAlunoPage() {
    const [alunos, setAlunos] = useState([]);

    useEffect(() => {
        const alunosLocalStorage = JSON.parse(localStorage.getItem('alunos')) || [];
        setAlunos(alunosLocalStorage);
        console.log(alunosLocalStorage);
    }, []);

    function excluir(aluno) {
        if (window.confirm('Tem certeza que deseja apagar esse aluno?')) {
            const novaLista = alunos.filter(item => item.id !== aluno.id);
            localStorage.setItem('alunos', JSON.stringify(novaLista));
            setAlunos(novaLista);
            alert('Aluno apagado com sucesso!');
        }
    }

    return (
        <Pagina titulo={'Lista de Alunos'}>
            <div className="text-end mb-3">
                <Button href="/alunos/form">Novo</Button>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Foto</th>
                        <th>Matricula</th>
                        <th>Nome</th>
                        <th>Sobrenome</th>
                        <th>Telefone</th>
                        <th>Data de Nascimento</th>
                        <th>Email</th>
                        <th>Faculdade</th>
                        <th>Curso</th>
                        <th>Periodo</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {alunos.length > 0 ? (
                        alunos.map((aluno) => (
                            <tr key={aluno.id}>
                                <td>
                                    <img src={aluno.foto} alt="Foto do aluno" style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                                </td>
                                <td>{aluno.matricula}</td>
                                <td>{aluno.nome}</td>
                                <td>{aluno.sobrenome}</td>
                                <td>{aluno.telefone}</td>
                                <td>{aluno.dataNascimento}</td>
                                <td>{aluno.email}</td>
                                <td>{aluno.faculdade}</td>
                                <td>{aluno.curso}</td>
                                <td>{aluno.periodo}</td>
                                <td>
                                    <Button variant="success" href={`/alunos/form?id=${aluno.id}`} className="me-2">
                                        Editar
                                    </Button>
                                    <Button variant="danger" onClick={() => excluir(aluno)}>
                                        Excluir
                                    </Button>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="11" className="text-center">
                                Nenhum aluno cadastrado.
                            </td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </Pagina>
    );
}
