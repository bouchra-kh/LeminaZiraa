package com.example.agriculture.model;

import com.example.agriculture.repository.wilayaRepository;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.repository.query.FluentQuery;
import org.springframework.stereotype.Service;


import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Optional;
import java.util.function.Function;

@Service
public class ExcelHelper2 {
    //  @Autowired
    private static wilayaRepository wilayaRep=new wilayaRepository() {
        @Override
        public wilaya findByNom(String nom) {
            return null;
        }

        @Override
        public List<wilaya> findAll() {
            return null;
        }

        @Override
        public List<wilaya> findAll(Sort sort) {
            return null;
        }

        @Override
        public List<wilaya> findAllById(Iterable<Long> longs) {
            return null;
        }

        @Override
        public <S extends wilaya> List<S> saveAll(Iterable<S> entities) {
            return null;
        }

        @Override
        public void flush() {

        }

        @Override
        public <S extends wilaya> S saveAndFlush(S entity) {
            return null;
        }

        @Override
        public <S extends wilaya> List<S> saveAllAndFlush(Iterable<S> entities) {
            return null;
        }

        @Override
        public void deleteAllInBatch(Iterable<wilaya> entities) {

        }

        @Override
        public void deleteAllByIdInBatch(Iterable<Long> longs) {

        }

        @Override
        public void deleteAllInBatch() {

        }

        @Override
        public wilaya getOne(Long aLong) {
            return null;
        }

        @Override
        public wilaya getById(Long aLong) {
            return null;
        }

        @Override
        public <S extends wilaya> List<S> findAll(Example<S> example) {
            return null;
        }

        @Override
        public <S extends wilaya> List<S> findAll(Example<S> example, Sort sort) {
            return null;
        }

        @Override
        public Page<wilaya> findAll(Pageable pageable) {
            return null;
        }

        @Override
        public <S extends wilaya> S save(S entity) {
            return null;
        }

        @Override
        public Optional<wilaya> findById(Long aLong) {
            return Optional.empty();
        }

        @Override
        public boolean existsById(Long aLong) {
            return false;
        }

        @Override
        public long count() {
            return 0;
        }

        @Override
        public void deleteById(Long aLong) {

        }

        @Override
        public void delete(wilaya entity) {

        }

        @Override
        public void deleteAllById(Iterable<? extends Long> longs) {

        }

        @Override
        public void deleteAll(Iterable<? extends wilaya> entities) {

        }

        @Override
        public void deleteAll() {

        }

        @Override
        public <S extends wilaya> Optional<S> findOne(Example<S> example) {
            return Optional.empty();
        }

        @Override
        public <S extends wilaya> Page<S> findAll(Example<S> example, Pageable pageable) {
            return null;
        }

        @Override
        public <S extends wilaya> long count(Example<S> example) {
            return 0;
        }

        @Override
        public <S extends wilaya> boolean exists(Example<S> example) {
            return false;
        }

        @Override
        public <S extends wilaya, R> R findBy(Example<S> example, Function<FluentQuery.FetchableFluentQuery<S>, R> queryFunction) {
            return null;
        }
    };

    // public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    static String[] HEADERs = { "Id", "Title", "Description", "Published" };
    static String SHEET = "Tutorials";
    ExcelHelper2(wilayaRepository wilayaRep){
        this.wilayaRep=wilayaRep;
    }
//    public static boolean hasExcelFormat(MultipartFile file) {
//        if (!TYPE.equals(file.getContentType())) {
//            return false;
//        }
//
//        return true;
//    }

    public static List<moughataa> excelToTutorials(InputStream is) {

        try {

            XSSFWorkbook workbook = new XSSFWorkbook(is);
            XSSFSheet sheet = workbook.getSheetAt(0);
            Iterator<Row> rows = sheet.iterator();
            //  rows.next();
            //
//            Workbook workbook = new XSSFWorkbook(is);
//
//            Sheet sheet = workbook.getSheet(SHEET);
//            Iterator<Row> rows = sheet.iterator();

            List<moughataa> tutorials = new ArrayList<moughataa>();

            int rowNumber = 0;
            while (rows.hasNext()) {
                Row currentRow = rows.next();
                // skip header
                if (rowNumber == 0) {
                    rowNumber++;
                    continue;

                }

                Iterator<Cell> cellsInRow = currentRow.iterator();
                //  System.out.println(cellsInRow.next().getStringCellValue());
                moughataa tutorial = new moughataa();

                int cellIdx = 0;
                while (cellsInRow.hasNext()) {
                    Cell currentCell = cellsInRow.next();
                    // System.out.println(currentCell.getStringCellValue());
                    //cellIdx=currentCell.getColumnIndex();
                    switch (cellIdx) {
                        case 0:
                            tutorial.setNom(currentCell.getStringCellValue());
                            break;

                        case 1:
                            tutorial.setLatt(currentCell.getNumericCellValue());
                            break;

                        case 2:
                            tutorial.setLongt(currentCell.getNumericCellValue());
                            break;
                        case 3:

                            tutorial.setWilaya(wilayaRep.findByNom(currentCell.getStringCellValue()));
                            break;

                        default:
                            break;
                    }

                    cellIdx++;
                }

                tutorials.add(tutorial);
            }

            workbook.close();

            return tutorials;
        } catch (IOException e) {
            throw new RuntimeException("fail to parse Excel file: " + e.getMessage());
        }
    }
}

