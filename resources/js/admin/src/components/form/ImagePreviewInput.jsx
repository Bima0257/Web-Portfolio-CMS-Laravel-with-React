import { Controller } from 'react-hook-form'

const ImagePreviewInput = ({ name, control, label = 'Image', preview, onChangePreview, accept = 'image/*' }) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="mb-3">
          <label className="form-label">{label}</label>

          {preview && (
            <div className="mb-2">
              <img
                src={preview}
                alt="Preview"
                style={{
                  width: '120px',
                  height: '120px',
                  objectFit: 'cover',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                }}
              />
            </div>
          )}

          <input
            type="file"
            className="form-control"
            accept={accept}
            onChange={(e) => {
              const file = e.target.files[0]
              field.onChange(file)
              onChangePreview(file)
            }}
          />

          <small className="text-muted">jpg, jpeg, png, svg (max 2MB)</small>
        </div>
      )}
    />
  )
}

export default ImagePreviewInput
