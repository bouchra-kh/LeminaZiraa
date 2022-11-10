


package com.example.agriculture.service;

        import com.example.agriculture.model.ligne_commande;
        import com.example.agriculture.repository.ligne_commRepository;
        import org.springframework.beans.factory.annotation.Autowired;
        import org.springframework.stereotype.Service;

        import java.util.List;

@Service
public class ligne_commService {
    @Autowired
    ligne_commRepository ligne_commRepository;
    public List<ligne_commande> getallligne_commande(){
        return ligne_commRepository.findAll();
    }
    public void save( ligne_commande u){
        ligne_commRepository.save(u);
    }
    public ligne_commande findbyid(long id){
        return  ligne_commRepository.findById(id).get();
    }
    public void deleteligne_commande(long id){

        ligne_commRepository.deleteById(id);
    }

    public ligne_commande updateligne_commande(long id,  ligne_commande l){
        ligne_commRepository.findById(id);
        l.setId_ligne_commande(id);
        ligne_commande newu=l;
        return newu;

    }
}
