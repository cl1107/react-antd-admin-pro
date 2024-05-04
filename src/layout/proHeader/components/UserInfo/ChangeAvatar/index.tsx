import { UploadOutlined } from '@ant-design/icons';

import { Button, Modal, Slider, Upload } from 'antd';
import type { RcFile } from 'antd/lib/upload';

import { useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';
import './index.less';

export const ChangeAvatar: React.FC<{
  isChangeAvatarVisible: boolean;
  onCancel: () => void;
}> = ({ isChangeAvatarVisible = false, onCancel }) => {
  const [zoom, setZoom] = useState(1);
  const [selectedFile, setSelectedFile] = useState<RcFile | null | string>(() => ``);
  // const [previewFile, setPreviewFile] = useState('');
  const editor = useRef<any>(null);
  const props = {
    name: 'file',
    action: '#',
    beforeUpload: async (file: RcFile) => {
      console.log('🚀 ~ file: index.tsx ~ line 30 ~ beforeUpload: ~ file', file);
      setSelectedFile(file);
      return false;
    },
  };
  const handleOk = () => {
    const canvas = editor.current.getImageScaledToCanvas();
    canvas.toBlob(async (blob: Blob) => {
      // const formData = new FormData();
      // formData.append('userId', getUserInfoFromLocalStorageByKey('userId'));
      // formData.append('file', blob);
      // try {
      //   await uploadUserAvatarApi(formData);
      //   // await uploadLogo(formData);
      //   onCancel();
      //   setAvatarRandom(Date.now().toString());
      // } catch (error) {
      //   console.log('%c [ error ]', 'font-size:13px; background:pink; color:#bf2c9f;', error);
      // }
    });
  };

  return (
    <Modal
      title="修改头像"
      open={isChangeAvatarVisible}
      onOk={handleOk}
      onCancel={onCancel}
      cancelText="取消"
      okText="确定"
      // confirmLoading={loading}
      // centered
      // bodyStyle={{ height: '100vh' }}
    >
      <div className="change-avatar flex justify-center">
        <AvatarEditor
          ref={editor}
          image={selectedFile}
          width={300}
          height={300}
          border={60}
          color={[0, 0, 0, 0.6]} // RGBA
          scale={zoom}
          rotate={0}
          crossOrigin="anonymous"
        />
      </div>
      <div className="flex justify-center mt-3">
        <div className="flex items-center justify-between w-110">
          <Upload {...props}>
            <Button icon={<UploadOutlined />} type="link">
              选择图片
            </Button>
          </Upload>

          <Slider
            style={{ flex: 1 }}
            value={zoom}
            defaultValue={1}
            min={0.5}
            step={0.1}
            max={5}
            onChange={(value) => setZoom(value)}
          />
        </div>
      </div>
    </Modal>
  );
};
