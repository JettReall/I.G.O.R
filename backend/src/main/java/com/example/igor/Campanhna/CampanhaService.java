package com.example.igor.Campanhna;

import com.example.igor.Campanhna.DTO.CampanhaCombateDTO;
import com.example.igor.Campanhna.Exception.CampanhaJaExisteException;
import com.example.igor.Combate.Combate;
import com.example.igor.Combate.Repositories.CombateRepository;
import com.example.igor.usuario.Usuario;
import com.example.igor.usuario.UsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CampanhaService {
    @Autowired
    private CampanhaRepository repository;
    @Autowired
    private UsuarioRepository usuarioRepository;
    //TODO
    /*
    @Autowired
    private MonstroRepository monstroRepository;
    @Autowired
    private PersonagemRepository personagemRepository;

     */
    @Autowired
    private CombateRepository combateRepository;


    public Campanha CriarCampanha(Campanha campanha, Long id) {
        if (repository.existsByNome(campanha.getNome())) {
            throw new CampanhaJaExisteException(campanha.getNome());
        } else {
            Usuario usuario = usuarioRepository.findById(id).orElseThrow(() -> new RuntimeException("Usuario não encontrado"));
            campanha.setUsuario(usuario);
            return repository.save(campanha);
        }
    }

    public int deletarCampanha(Long id) {
        if (id > 0) {
            repository.deleteById(id);
            return 0;
        } else {
            return 1;
        }
    }

    /*
    //TODO adicionar o repository de ficha pra verificar se a ficha existe
    public Campanha addFicha(CampanhaFichaDTO dto) {
        Campanha campanha = repository.findById(dto.campanhaId)
                .orElseThrow(() -> new RuntimeException("Campanha não encontrada"));

        if (dto.ficha.getTipo() == TipoFicha.PERSONAGEM) {
            Personagem personagem = personagemRepository.findById(dto.ficha.getId())
                    .orElseThrow(() -> new RuntimeException("Personagem não encontrado"));

            campanha.getPersonagens().add(personagem);
        }

        if (dto.ficha.getTipo() == TipoFicha.MONSTRO) {
            Monstro monstro = monstroRepository.findById(dto.ficha.getId())
                    .orElseThrow(() -> new RuntimeException("Monstro não encontrado"));

            campanha.getMonstros().add(monstro);
        }

        return repository.save(campanha);
    }

    public Campanha removerFicha(CampanhaFichaDTO dto) {
        Campanha campanha = repository.findById(dto.campanhaId)
                .orElseThrow(() -> new RuntimeException("Campanha não encontrada"));

        if (dto.ficha.getTipo() == TipoFicha.PERSONAGEM) {
            campanha.getPersonagens().removeIf(p -> p.getId().equals(dto.ficha.getId()));
        }

        if (dto.ficha.getTipo() == TipoFicha.MONSTRO) {
            campanha.getMonstros().removeIf(m -> m.getId().equals(dto.ficha.getId()));
        }

        for (Combate combate : campanha.getCombates()) {
            combate.getPersonagens()
                    .removeIf(personagem -> personagem.getId().equals(dto.ficha.getId()));
        }
        for (Combate combate : campanha.getCombates()) {
            combate.getMonstros()
                    .removeIf(monstro -> monstro.getId().equals(dto.ficha.getId()));
        }

        return repository.save(campanha);
    }

     */

    public Campanha addCombate(CampanhaCombateDTO dto){
        Campanha campanha = repository.findById(dto.campanhaId)
                .orElseThrow(() -> new RuntimeException("Campanha não encontrada"));

        Combate combate = new Combate();
        combate.setNome(dto.combateNome);

        campanha.getCombates().add(combate);

        return repository.save(campanha);
    }

    public Campanha removerCombate(CampanhaCombateDTO dto) {
        Campanha campanha = repository.findById(dto.campanhaId)
                .orElseThrow(() -> new RuntimeException("Campanha não encontrada"));

        campanha.getCombates()
                .removeIf(combate -> combate.getId().equals(dto.combateId));

        return repository.save(campanha);
    }

}
