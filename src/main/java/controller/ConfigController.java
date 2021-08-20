package controller;

import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

import container.Container;
import dto.GenFile;
import dto.GenSet;
import service.ConfigService;


public class ConfigController {
	
		ConfigService configService;
	
		public ConfigController() {
			configService = Container.configService;
		}

		public String setting(HttpServletRequest request, HttpServletResponse response) {			
			return "usr/config/setting";
		}
		
		@SuppressWarnings("unchecked")
		public String getOptions(HttpServletRequest request, HttpServletResponse response) throws IOException{
			GenSet genSet = configService.getOptions();
			
			// JSON 형태로 담기
			JSONObject obj = new JSONObject(); 
			obj.put("editorNum", genSet.getEditorNum());
			obj.put("uploaderNum", genSet.getUploaderNum());
			obj.put("downloaderNum", genSet.getDownloaderNum());

			// JSON 형태로 클라이언트에 전달
			response.getWriter().print(obj.toJSONString());
			
			return "notJspPath";
		}

		public String setOptions(HttpServletRequest request, HttpServletResponse response) throws IOException {

			//JSON Parsing
			StringBuffer data = new StringBuffer();
			String line = null;
			
			try {
				// BufferedReader로 request읽기
				BufferedReader reader = request.getReader();
				
				while ((line = reader.readLine()) != null) {
					data.append(line);
				};
				
				// JSONParser객체 생성
				JSONParser parser = new JSONParser();
				// JSONParser로 파싱 후
				// JSONObject에 JSON형태로 담기
				JSONArray files = (JSONArray) parser.parse(data.toString());

				int editorNum = Integer.parseInt(files.get(0).toString());
				int uploaderNum = Integer.parseInt(files.get(1).toString());
				int downloaderNum = Integer.parseInt(files.get(2).toString());
					
				configService.setOptions(editorNum, uploaderNum, downloaderNum);
				
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			
			// 클라이언트로 완료 메시지 전달
			response.getWriter().append("DONE");

			return "notJspPath";
		}
		
}
