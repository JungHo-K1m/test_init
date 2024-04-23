import Blob "mo:base/Blob";
import List "mo:base/List";

actor DcmUploader {
    private var files: List.List<(Text, Blob)> = List.nil(); // 빈 리스트로 초기화

    // 파일 업로드 함수
    public shared func uploadFile(filename: Text, data: Blob) : async Text {
        // 파일 리스트에 새 파일 추가, 새 요소를 리스트의 시작에 추가
        files := List.push((filename, data), files);
        return "File uploaded successfully!";
    }
}
