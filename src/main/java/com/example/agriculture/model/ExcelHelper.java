package com.example.agriculture.model;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

//import com.bezkoder.spring.files.excel.model.Tutorial;
@Service
public class ExcelHelper {
    // public static String TYPE = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
    static String[] HEADERs = { "Id", "Title", "Description", "Published" };
    static String SHEET = "Tutorials";

//    public static boolean hasExcelFormat(MultipartFile file) {
//        if (!TYPE.equals(file.getContentType())) {
//            return false;
//        }
//
//        return true;
//    }

    public static List<wilaya> excelToTutorials(InputStream is) {
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

            List<wilaya> tutorials = new ArrayList<wilaya>();

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
                wilaya tutorial = new wilaya();

                int cellIdx = 0;
                while (cellsInRow.hasNext()) {
                    Cell currentCell = cellsInRow.next();
                    // System.out.println(currentCell.getStringCellValue());
                    //cellIdx=currentCell.getColumnIndex();
                    switch (cellIdx) {
                        case 0:
                            tutorial.setNom(currentCell.getStringCellValue());
                            break;

//                        case 1:
//                            tutorial.setLatt(currentCell.getNumericCellValue());
//                            break;
//                        case 2:
//                            tutorial.setLongt(currentCell.getNumericCellValue());



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


