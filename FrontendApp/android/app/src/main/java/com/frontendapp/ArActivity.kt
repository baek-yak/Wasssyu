package com.frontendapp

import android.Manifest
import android.content.pm.PackageManager
import android.hardware.Camera
import android.os.Bundle
import android.view.Surface
import android.view.SurfaceHolder
import android.view.SurfaceView
import android.view.WindowManager
import android.widget.Toast
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import androidx.core.content.ContextCompat
import com.google.ar.core.ArCoreApk
import com.google.ar.core.Config
import com.google.ar.core.Session

class ArActivity : AppCompatActivity(), SurfaceHolder.Callback {
    private var mSession: Session? = null
    private var userRequestedInstall = true
    private var mCamera: Camera? = null

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_ar)

        val surfaceView = findViewById<SurfaceView>(R.id.cameraPreview)
        surfaceView.holder.addCallback(this)

        if (!CameraPermissionHelper.hasCameraPermission(this)) {
            CameraPermissionHelper.requestCameraPermission(this)
        }
    }

    override fun onResume() {
        super.onResume()

        if (CameraPermissionHelper.hasCameraPermission(this)) {
            startArSession()
        }
    }

    private fun startArSession() {
        checkArSupport()

        try {
            if (mSession == null) {
                when (ArCoreApk.getInstance().requestInstall(this, userRequestedInstall)) {
                    ArCoreApk.InstallStatus.INSTALLED -> {
                        mSession = Session(this)
                        configureSession()
                    }
                    ArCoreApk.InstallStatus.INSTALL_REQUESTED -> {
                        userRequestedInstall = false
                        return
                    }
                }
            }
        } catch (e: Exception) {
            Toast.makeText(this, "ARCore 초기화 오류: ${e.message}", Toast.LENGTH_LONG).show()
        }
    }

    private fun checkArSupport() {
        ArCoreApk.getInstance().checkAvailability(this).apply {
            if (!isSupported) {
                Toast.makeText(this@ArActivity, "ARCore를 지원하지 않는 기기입니다.", Toast.LENGTH_LONG).show()
                finish()
            }
        }
    }

    private fun configureSession() {
        mSession?.let { session ->
            val config = Config(session)
            session.configure(config)
        }
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<String>, results: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, results)
        if (CameraPermissionHelper.hasCameraPermission(this)) {
            onResume() // 권한이 허용되었을 때 onResume()을 다시 호출
        } else {
            Toast.makeText(this, "카메라 권한이 필요합니다.", Toast.LENGTH_LONG).show()
            finish()
        }
    }

    override fun surfaceCreated(holder: SurfaceHolder) {
        mCamera = Camera.open()
        mCamera?.let { camera ->
            setCameraDisplayOrientation()
            camera.setPreviewDisplay(holder)
            camera.startPreview()
        }
    }

    override fun surfaceChanged(holder: SurfaceHolder, format: Int, width: Int, height: Int) {}

    override fun surfaceDestroyed(holder: SurfaceHolder) {
        mCamera?.release()
        mCamera = null
    }

    private fun setCameraDisplayOrientation() {
        val rotation = windowManager.defaultDisplay.rotation
        val degrees = when (rotation) {
            Surface.ROTATION_0 -> 90
            Surface.ROTATION_90 -> 0
            Surface.ROTATION_180 -> 270
            Surface.ROTATION_270 -> 180
            else -> 90
        }
        mCamera?.setDisplayOrientation(degrees)
    }
}
