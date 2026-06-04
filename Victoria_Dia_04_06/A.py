import os
from PIL import Image

def converter_para_png(caminho_base):
    extensoes_suportadas = ('.jpg', '.jpeg', '.webp', '.bmp', '.jfif')
    
    print(f"📂 Iniciando varredura em: {os.path.abspath(caminho_base)}\n")

    for raiz, _, arquivos in os.walk(caminho_base):
        for arquivo in arquivos:
            nome_sem_ext, extensao = os.path.splitext(arquivo)
            extensao = extensao.lower()
            
            if extensao in extensoes_suportadas:
                caminho_origem = os.path.join(raiz, arquivo)
                caminho_destino = os.path.join(raiz, nome_sem_ext + ".png")
                
                try:
                    with Image.open(caminho_origem) as img:
                        img_convertida = img.convert("RGBA")
                        img_convertida.save(caminho_destino, "PNG")
                    
                    os.remove(caminho_origem)
                    print(f"✅ Convertido: {arquivo} -> {nome_sem_ext}.png")
                    
                except Exception as e:
                    print(f"❌ Erro ao processar {arquivo}: {e}")

if __name__ == "__main__":
    pasta_principal = "Imagens"
    
    if os.path.exists(pasta_principal):
        converter_para_png(pasta_principal)
        print("\n✨ Tudo pronto! Suas imagens agora são .png.")
    else:
        print(f"⚠️ A pasta '{pasta_principal}' não foi encontrada.")