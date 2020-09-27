export function normalizeAvatar( avatar ) {
  if ( !avatar )
    return '//lain.bgm.tv/pic/user/l/icon.jpg';

  if ( avatar.startsWith( 'https://tinygrail.oss-cn-hangzhou.aliyuncs.com/' ) )
    return avatar + "!w120";

  let a = avatar.replace( "http://", "//" );
  return a;
}
