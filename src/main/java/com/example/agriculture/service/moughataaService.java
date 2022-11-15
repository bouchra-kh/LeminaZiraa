package com.example.agriculture.service;




import com.example.agriculture.model.moughataa;
import com.example.agriculture.repository.moughataaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
@Service
public class moughataaService {
    @Autowired
    com.example.agriculture.repository.moughataaRepository moughataaRepository;
    public List<moughataa> getallMoughataa( ){
        return moughataaRepository.findAll();
    }
    public void save(moughataa m){
        moughataaRepository.save(m);
    }
    public moughataa findbyid(long id){
        return moughataaRepository.findById(id).isPresent()?moughataaRepository.findById(id).get():null;
    }
    public void deletemoghata(long id){

        moughataaRepository.deleteById(id);
    }

    public moughataa updateM(long id,  moughataa m) {
        moughataaRepository.findById(id);
        m.setId(id);
        moughataa newu = moughataaRepository.save(m);
        //    =m;
        return newu;

    }


}
