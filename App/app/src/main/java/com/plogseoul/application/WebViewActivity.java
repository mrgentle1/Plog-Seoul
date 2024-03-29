package com.plogseoul.application;

import android.Manifest;
import android.app.Activity;
import android.content.ContentResolver;
import android.content.ContentValues;
import android.content.Intent;
import android.content.pm.PackageManager;
import android.content.res.Configuration;
import android.media.MediaScannerConnection;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.provider.MediaStore;
import android.util.Log;
import android.view.View;
import android.webkit.GeolocationPermissions;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import androidx.core.content.FileProvider;

import com.facebook.appevents.internal.Constants;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.firebase.storage.FileDownloadTask;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;

public class WebViewActivity extends AppCompatActivity {
    private String TAG = WebViewActivity.class.getSimpleName();
    private long backBtnTime = 0;

    FirebaseStorage storage = FirebaseStorage.getInstance();
    JavaScriptInterface jsInterface = new JavaScriptInterface(this);

    private WebView webView;

    private static final int PERMISSION_REQUEST_CODE = 1234;
    private static final int REQUEST_IMAGE_CAPTURE = 1;

    // 필요한 권한들을 배열에 추가
    String[] appPermissions = {
            Manifest.permission.ACCESS_FINE_LOCATION,
            Manifest.permission.CAMERA,
            Manifest.permission.WRITE_EXTERNAL_STORAGE,
            Manifest.permission.READ_EXTERNAL_STORAGE
    };

//    private String rootUrl = "https://plog-seoul-git-develop-mrgentle1.vercel.app/";  // develop
    private String rootUrl = "https://plog-seoul.vercel.app/";  // production

    private void checkPermissions() {
        ArrayList<String> permissionsNeeded = new ArrayList<>();

        // 권한이 허용되지 않은 것이 있는지 확인
        for (String perm : appPermissions){
            if (ContextCompat.checkSelfPermission(this, perm) != PackageManager.PERMISSION_GRANTED) {
                permissionsNeeded.add(perm);
            }
        }

        // 필요한 권한이 있는 경우 요청
        if (!permissionsNeeded.isEmpty()) {
            ActivityCompat.requestPermissions(this,
                    permissionsNeeded.toArray(new String[0]),
                    PERMISSION_REQUEST_CODE);
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_webview);

        // Check and request permissions
        checkPermissions();

        webView = (WebView) findViewById(R.id.webview);

        webView.setWebViewClient(new WebViewClient());  // 새 창 띄우기 않기
        webView.setWebChromeClient(new WebChromeClient() {
            @Override
            public void onGeolocationPermissionsShowPrompt(String origin, GeolocationPermissions.Callback callback) {
                callback.invoke(origin, true, false);
            }
        });
        WebView.setWebContentsDebuggingEnabled(true);

        webView.setOnLongClickListener(new View.OnLongClickListener() {
            @Override
            public boolean onLongClick(View view) {
                return true;
            }
        });
        webView.setLongClickable(false);

        webView.getSettings().setLoadWithOverviewMode(true);  // WebView 화면크기에 맞추도록 설정 - setUseWideViewPort 와 같이 써야함
        webView.getSettings().setUseWideViewPort(true);  // wide viewport 설정 - setLoadWithOverviewMode 와 같이 써야함

        webView.getSettings().setSupportZoom(false);  // 줌 설정 여부
        webView.getSettings().setBuiltInZoomControls(false);  // 줌 확대/축소 버튼 여부

        webView.getSettings().setGeolocationEnabled(true);  // GPS 사용 여부

        webView.getSettings().setJavaScriptEnabled(true); // 자바스크립트 사용여부
//        webview.addJavascriptInterface(new AndroidBridge(), "android");
        webView.getSettings().setJavaScriptCanOpenWindowsAutomatically(true); // javascript가 window.open()을 사용할 수 있도록 설정
        webView.getSettings().setSupportMultipleWindows(true); // 멀티 윈도우 사용 여부

        webView.getSettings().setDomStorageEnabled(true);  // 로컬 스토리지 (localStorage) 사용여부
        webView.addJavascriptInterface(jsInterface, "Android");


        //웹페이지 호출
//        webView.loadUrl("http://www.naver.com");
        webView.loadUrl(rootUrl);
    }

    @Override
    public void onBackPressed() {
        long curTime = System.currentTimeMillis();
        long gapTime = curTime - backBtnTime;
        String nowUrl = webView.getUrl();

        if (webView.canGoBack() && !nowUrl.equals(rootUrl+"home") && !nowUrl.equals(rootUrl+"record/ing")
        && !nowUrl.equals(rootUrl) && !nowUrl.equals(rootUrl+"onboard")) {
            webView.goBack();
        }  else if (0 <= gapTime && 2000 >= gapTime) {
            super.onBackPressed();
        } else if(nowUrl.equals(rootUrl+"record/ing")) {
            webView.loadUrl("javascript:receiveBackPressed(true)");
        } else if (nowUrl.equals(rootUrl) || nowUrl.equals(rootUrl+"onboard")) {

        } else {
            backBtnTime = curTime;
            Toast.makeText(this, "한번 더 누르면 종료됩니다.", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    public void onRequestPermissionsResult(int requestCode, String[] permissions, int[] grantResults) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults);
        if (requestCode == PERMISSION_REQUEST_CODE) {
            HashMap<String, Integer> permissionResults = new HashMap<>();
            int deniedCount = 0;

            // 사용자의 응답을 받아 권한이 거부된 경우 계산
            for (int i=0; i<grantResults.length; i++){
                // 거부된 권한을 계산
                if (grantResults[i] == PackageManager.PERMISSION_DENIED){
                    permissionResults.put(permissions[i], grantResults[i]);
                    deniedCount++;
                }
            }

            // 거부된 권한이 있을 경우
            if (deniedCount != 0){
                // 사용자에게 권한이 필요한 이유를 설명하고, 설정으로 이동하게 유도하는 다이얼로그 표시
                // 여기에 자신의 로직을 추가하세요
            } else {
                // 모든 권한이 허용된 경우, 원하는 로직을 수행
                // 여기에 자신의 로직을 추가하세요
            }
        }
    }

    public class JavaScriptInterface {

        private Activity activity;
        private String currentPhotoPath;

        private static final int REQUEST_IMAGE_CAPTURE = 1;

        FirebaseStorage storage = FirebaseStorage.getInstance();
        StorageReference storageRef = storage.getReference();

        JavaScriptInterface(Activity activity) {
            this.activity = activity;
        }

        private File createImageFile() throws IOException {
            System.out.println("createImageFile() called!");
            // Create an image file name
            String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
            String imageFileName = "JPEG_" + timeStamp + "_";
            File storageDir = activity.getExternalFilesDir(Environment.DIRECTORY_PICTURES);
            File image = File.createTempFile(
                    imageFileName,  /* prefix */
                    ".jpg",         /* suffix */
                    storageDir      /* directory */
            );

            // Save a file: path for use with ACTION_VIEW intents
            currentPhotoPath = image.getAbsolutePath();
            System.out.println("set currentPhotoPath = " + currentPhotoPath);
            return image;
        }

        @JavascriptInterface
        public void openCamera() {
            System.out.println("openCamera clicked!");
            if (ContextCompat.checkSelfPermission(activity, Manifest.permission.CAMERA) == PackageManager.PERMISSION_GRANTED) {
                Intent takePictureIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);
                if (takePictureIntent.resolveActivity(activity.getPackageManager()) != null) {
                    // Create the File where the photo should go
                    File photoFile = null;
                    try {
                        photoFile = createImageFile();
                    } catch (IOException ex) {
                        // Error occurred while creating the File
                    }
                    // Continue only if the File was successfully created
                    if (photoFile != null) {
                        Uri photoURI = FileProvider.getUriForFile(activity,
                                "com.plogseoul.application.fileprovider",
                                photoFile);

                        System.out.println("File was successfully created!" + photoURI);
                        takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, photoURI);
                        activity.startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE);
                    }
                }
            } else {
                // 카메라 권한이 없는 경우에 대한 처리
            }
        }

        public void galleryAddPic() {
            String timeStamp = new SimpleDateFormat("yyyyMMdd_HHmmss").format(new Date());
            String imageFileName = "JPEG_" + timeStamp + ".jpg";

            ContentValues values = new ContentValues();
            values.put(MediaStore.Images.Media.DISPLAY_NAME, imageFileName);
            values.put(MediaStore.Images.Media.MIME_TYPE, "image/jpeg");
            values.put(MediaStore.Images.Media.RELATIVE_PATH, Environment.DIRECTORY_PICTURES);

            ContentResolver resolver = activity.getContentResolver();
            Uri imageUri = resolver.insert(MediaStore.Images.Media.EXTERNAL_CONTENT_URI, values);

            try {
                if (imageUri != null) {
                    OutputStream outputStream = resolver.openOutputStream(imageUri);
                    if (outputStream != null) {
                        // Write your data to outputStream here.
                        // You might get data from a file, like this:
                         File initialFile = new File(currentPhotoPath);
                         InputStream targetStream = new FileInputStream(initialFile);
                         byte[] buffer = new byte[8 * 1024];
                         int bytesRead;
                         while ((bytesRead = targetStream.read(buffer)) != -1) {
                             outputStream.write(buffer, 0, bytesRead);
                         }
                         targetStream.close();

                        Toast.makeText(activity, "저장되었습니다", Toast.LENGTH_SHORT).show();
                    }
                }
            } catch (Exception e) {
                Log.e("YOUR_APP_LOG_TAG", "Error occurred: " + e.getMessage());
            }
        }


        public String getCurrentPhotoPath() {
            return currentPhotoPath;
        }

        @JavascriptInterface
        public void showToastMessage(String message) {
            Toast.makeText(activity, message, Toast.LENGTH_SHORT).show();
        }

        @JavascriptInterface
        public void shareInstagram(String url) throws IOException {

            int queryStart = url.indexOf("?");
            if (queryStart != -1) {
                url = url.substring(0, queryStart);
            }
            String fileUrl = url.substring(url.lastIndexOf('/') + 1); // 80e1f9b9-cd22-413d-94f3-91e4881d6036_image.png

            StorageReference ref = storage.getReference(fileUrl);
            File localFile = File.createTempFile("images", "jpg");
            String absolutePath = localFile.getAbsolutePath();
            ref.getFile(localFile).addOnSuccessListener(new OnSuccessListener<FileDownloadTask.TaskSnapshot>() {
                @Override
                public void onSuccess(FileDownloadTask.TaskSnapshot taskSnapshot) {
                    // Local temp file has been created
                    ref.delete();
                }
            }).addOnFailureListener(new OnFailureListener() {
                @Override
                public void onFailure(@NonNull Exception exception) {
                    // Handle any errors
                    showToastMessage("공유하기에 실패했습니다. 다시 시도해주세요.");
                }
            });


            Intent intent = new Intent(Intent.ACTION_SEND);
            intent.setType("image/*");
            File file = new File(absolutePath);
            Uri uri = FileProvider.getUriForFile(activity, getApplicationContext().getPackageName() + ".fileprovider", file);
            intent.putExtra(Intent.EXTRA_STREAM, uri);
            activity.grantUriPermission(
                    "com.instagram.android", uri, Intent.FLAG_GRANT_READ_URI_PERMISSION);
            intent.setPackage("com.instagram.android");
            try {
                startActivity(intent);
            } catch (Exception e) {
                showToastMessage("instagram이 설치되어있지 않습니다.");
            }



//            System.out.println("shareInstagram called!" + currentPhotoPath);
//            // Instantiate an intent
//            Intent intent = new Intent("com.instagram.share.ADD_TO_STORY");
//
//            // Attach your App ID to the intent
//            String sourceApplication = "232135862851032"; // This is your application's FB ID
//            intent.setType("image/*");
//            intent.putExtra("source_application", sourceApplication);
//
//            // Attach your sticker to the intent from a URI, and set background colors
//            Uri stickerAssetUri = Uri.parse(currentPhotoPath);
//            intent.putExtra("interactive_asset_uri", stickerAssetUri);
//            intent.putExtra("top_background_color", "#33FF33");
//            intent.putExtra("bottom_background_color", "#FF00FF");
//
//            // Grant URI permissions for the image
//            intent.setFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION);
//            intent.setPackage("com.instagram.android");
//
//            // Grant URI permissions for the sticker
//            activity.grantUriPermission(
//                    "com.instagram.android", stickerAssetUri, Intent.FLAG_GRANT_READ_URI_PERMISSION);
//
////            System.out.println("intent!!");
////            activity.startActivity(intent);
//            // Verify that the activity resolves the intent and start it
//            if (activity.getPackageManager().resolveActivity(intent, 0) != null) {
//                System.out.println("hi~~");
//                activity.startActivityForResult(intent, 0);
//            }
        }

    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, @Nullable Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (requestCode == 0 && resultCode == RESULT_OK) {
            System.out.println("requestCode = " + requestCode);
            this.startActivity(data);
        }
        if (requestCode == REQUEST_IMAGE_CAPTURE && resultCode == RESULT_OK) {
            jsInterface.galleryAddPic();
            File photoFile = new File(jsInterface.getCurrentPhotoPath());

            Uri photoURI = FileProvider.getUriForFile(this,
                    "com.plogseoul.application.fileprovider",
                    photoFile);

            StorageReference storageRef = FirebaseStorage.getInstance().getReference();
            StorageReference ref = storageRef.child(photoFile.getName());

            UploadTask uploadTask = ref.putFile(photoURI);
            uploadTask.addOnFailureListener(new OnFailureListener() {
                @Override
                public void onFailure(@NonNull Exception exception) {
                    // Handle unsuccessful uploads
                }
            }).addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
                @Override
                public void onSuccess(UploadTask.TaskSnapshot taskSnapshot) {
                    // taskSnapshot.getMetadata() contains file metadata such as size, content-type, etc.
                    ref.getDownloadUrl().addOnSuccessListener(new OnSuccessListener<Uri>() {
                        @Override
                        public void onSuccess(Uri uri) {
                            // Here uri is the URL that can be used to download the file.
                            String imageUrl = uri.toString();
                            webView.loadUrl("javascript:receiveImageURL('" + imageUrl + "')");
                        }
                    });
                }
            });
        }
    }

    @Override
    public void onConfigurationChanged(@NonNull Configuration newConfig) {
        super.onConfigurationChanged(newConfig);
    }

}